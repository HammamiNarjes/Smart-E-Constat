import json
import sys
import numpy as np
import torch
from transformers import AutoModel, AutoTokenizer
import torch.nn.functional as F
import re
import tensorflow as tf

# Chargement du tokenizer et modèle BERT une seule fois
tokenizer = AutoTokenizer.from_pretrained("bert-base-multilingual-cased")
bert_model = AutoModel.from_pretrained("bert-base-multilingual-cased")
bert_model.eval()

# Charger le modèle hybride Keras (modèle entraîné)
hybrid_model = tf.keras.models.load_model('best_light_model.h5')

def clean_text(text):
    """Nettoyage simple du texte"""
    if not text:
        return ''
    text = text.lower()
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def get_bert_embedding(text):
    """Obtenir l'embedding BERT pour un texte donné"""
    if not text:
        # Retourne un vecteur nul de la taille de l'embedding BERT
        return np.zeros(bert_model.config.hidden_size)
    try:
        inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=512)
        with torch.no_grad():
            outputs = bert_model(**inputs)
        
        last_hidden = outputs.last_hidden_state  # (1, seq_len, hidden_size)
        weights = F.softmax(last_hidden.mean(dim=-1), dim=1)  # (1, seq_len)
        
        # Weighted sum pooling
        weighted_embedding = (last_hidden * weights.unsqueeze(-1)).sum(dim=1).squeeze().cpu().numpy()
        return weighted_embedding
    except Exception as e:
        print(f"Erreur lors de la génération des embeddings BERT: {str(e)}")
        return np.zeros(bert_model.config.hidden_size)

def predict_fault(data):
    """
    Fonction principale :
    - nettoie les textes
    - génère les embeddings BERT
    - prépare le vecteur final
    - fait la prédiction avec le modèle Keras
    """
    # Extraire et nettoyer les champs textuels du sinistre
    decl_a = clean_text(data.get('declaration_a', ''))
    decl_b = clean_text(data.get('declaration_b', ''))
    circ_a = clean_text(data.get('circonstance_a', ''))
    circ_b = clean_text(data.get('circonstance_b', ''))

    # Générer les embeddings BERT
    emb_a = get_bert_embedding(f"{circ_a} {decl_a}")
    emb_b = get_bert_embedding(f"{circ_b} {decl_b}")

    # Concaténer les embeddings pour avoir la bonne forme d'entrée
    final_features = np.hstack([emb_a, emb_b])
    final_features = final_features.reshape(1, 1, final_features.shape[0])  # Shape attendue par ton modèle Keras

    # Prédiction
    pred = hybrid_model.predict(final_features)[0][0]
    
    return {
        'is_faulty': bool(pred > 0.5),
        'probability': float(pred),
        'message': 'Conducteur A est fautif' if pred > 0.5 else 'Conducteur B est fautif'
    }

if __name__ == '__main__':
    # Lire les données JSON envoyées par Node via stdin
    input_data = json.loads(sys.stdin.read())

    # Faire la prédiction
    result = predict_fault(input_data)

    # Afficher le résultat JSON (stdout)
    print(json.dumps(result))
