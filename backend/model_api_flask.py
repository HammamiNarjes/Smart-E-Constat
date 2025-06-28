from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from transformers import AutoTokenizer, AutoModel
import torch
import re
import logging
import pandas as pd
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuration des champs
REQUIRED_FIELDS = {
    'conducteur_a': ['immatriculation_a', 'circonstance_a', 'declaration_a', 'type_vehicule_a', 'point_de_choc_a'],
    'conducteur_b': ['immatriculation_b', 'circonstance_b', 'declaration_b', 'type_vehicule_b', 'point_de_choc_b'],
    'commun': ['date_accident', 'heure_accident']
}

# Chargement des modèles
try:
    model = tf.keras.models.load_model('best_light_model.h5')
    logger.info(f"✅ Modèle chargé. Shape attendue: {model.input_shape}")
    tokenizer = AutoTokenizer.from_pretrained("bert-base-multilingual-cased")
    bert_model = AutoModel.from_pretrained("bert-base-multilingual-cased")
    bert_model.eval()
except Exception as e:
    logger.error(f"❌ Erreur de chargement: {str(e)}")
    raise

def clean_text(text):
    return re.sub(r'\s+', ' ', str(text).lower()).strip() if text else ""

def get_bert_embedding(text):
    if not text: return np.zeros(bert_model.config.hidden_size)
    try:
        inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=512)
        with torch.no_grad():
            outputs = bert_model(**inputs)
        return outputs.last_hidden_state.mean(dim=1).squeeze().cpu().numpy()
    except Exception as e:
        logger.error(f"Erreur BERT: {str(e)}")
        return np.zeros(bert_model.config.hidden_size)

def prepare_input(data):
    # Textes combinés
    text_a = clean_text(f"{data['circonstance_a']} {data['declaration_a']}")
    text_b = clean_text(f"{data['circonstance_b']} {data['declaration_b']}")
    
    # Embeddings
    emb_a = get_bert_embedding(text_a)
    emb_b = get_bert_embedding(text_b)
    
    # DataFrame conforme à l'entraînement
    temp_df = pd.DataFrame({
        'Date': [data['date_accident']],
        'Time': [data['heure_accident']],
        'Vehicle_1': [str(data['immatriculation_a'])],
        'Vehicle_2': [str(data['immatriculation_b'])],
        'Vehicle_Type_1': [data['type_vehicule_a']],
        'Vehicle_Type_2': [data['type_vehicule_b']],
        'Point de choc_1': [data['point_de_choc_a']],
        'Point de choc_2': [data['point_de_choc_b']]
    })
    
    # Traitement temporel
    date = datetime.strptime(data['date_accident'], '%Y-%m-%d')
    date_features = [
        date.year, date.month, date.day, date.weekday(),
        np.sin(2*np.pi*date.month/12), np.cos(2*np.pi*date.month/12)
    ]
    
    # Encodage one-hot
    cat_cols = ['Vehicle_1', 'Vehicle_2', 'Vehicle_Type_1', 'Vehicle_Type_2', 
               'Point de choc_1', 'Point de choc_2']
    temp_df = pd.get_dummies(temp_df, columns=cat_cols, drop_first=True)
    
    # Concaténation finale
    features = np.concatenate([
        emb_a, emb_b,
        temp_df.drop(['Date', 'Time'], axis=1).values.flatten(),
        np.array(date_features)
    ]).astype(np.float32)
    
    # Ajustement dimensionnel
    expected_dim = model.input_shape[-1]
    if len(features) != expected_dim:
        features = np.pad(features, (0, max(0, expected_dim - len(features))))[:expected_dim]
    
    return features.reshape(1, 1, -1)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        # Prétraitement
        input_data = prepare_input(data)
        logger.info(f"Shape d'entrée: {input_data.shape}")
        
        # Prédiction
        proba = float(model.predict(input_data, verbose=0)[0][0])
        result = {
            "prediction": "Conducteur A" if proba > 0.5 else "Conducteur B",
            "probabilities": {
                "conducteur_A": proba,
                "conducteur_B": 1 - proba
            },
            "status": "success"
        }
        
        logger.info(f"Résultat: {result}")
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Erreur: {str(e)}", exc_info=True)
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)