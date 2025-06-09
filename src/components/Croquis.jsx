import React, { useState, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useNavigate } from 'react-router-dom';

const ItemTypes = {
  ELEMENT: 'element',
};

const Element = ({ name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ELEMENT,
    item: { name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: '8px',
        margin: '5px',
        border: '1px solid gray',
        backgroundColor: 'white',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        userSelect: 'none',
      }}
    >
      {name}
    </div>
  );
};

const SceneElement = ({ el, index, onRemove }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ELEMENT,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      onClick={() => onRemove(index)}
      style={{
        position: 'absolute',
        left: el.x,
        top: el.y,
        backgroundColor: 'lightblue',
        padding: '5px',
        borderRadius: '4px',
        border: '1px solid #000',
        cursor: 'move',
        userSelect: 'none',
        opacity: isDragging ? 0.5 : 1,
        transform: `rotate(${el.rotation || 0}deg)`,
        whiteSpace: 'nowrap',
      }}
      title="Cliquez pour supprimer"
    >
      {el.name}
    </div>
  );
};

const Scene = ({ onDrop, elements, setElements }) => {
  const sceneRef = useRef(null);

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.ELEMENT,
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const canvasRect = sceneRef.current.getBoundingClientRect();
      const x = offset.x - canvasRect.left;
      const y = offset.y - canvasRect.top;

      if (item.index !== undefined) {
        setElements((prev) => {
          const updated = [...prev];
          updated[item.index] = { ...updated[item.index], x, y };
          return updated;
        });
      } else {
        onDrop(item.name, { x, y });
      }
    },
  }));

  const handleRemove = (index) => {
    setElements((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      ref={(node) => {
        drop(node);
        sceneRef.current = node;
      }}
      style={{
        width: '100%',
        height: '500px',
        border: '2px dashed blue',
        marginTop: '20px',
        position: 'relative',
        backgroundImage:
          'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), ' +
          'linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), ' +
          'linear-gradient(45deg, transparent 75%, #f0f0f0 75%), ' +
          'linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
        overflow: 'hidden',
      }}
    >
      {elements.map((el, index) => (
        <SceneElement key={index} el={el} index={index} onRemove={handleRemove} />
      ))}
    </div>
  );
};

const Croquis = () => {
  const [elements, setElements] = useState([]);
  const navigate = useNavigate();

  const handleDrop = (name, offset) => {
    setElements((prev) => [...prev, { name, x: offset.x, y: offset.y }]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: '20px' }}>
        <h2 style={{ color: 'blue' }}>Croquis de l'accident</h2>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ minWidth: '220px' }}>
            <h4>🚗 Véhicules</h4>
            <Element name="🚗 A" />
            <Element name="🚗 B" />
            <Element name="🚌 Bus" />
            <Element name="🏍️ Moto" />

            <h4>🚦 Signalisation</h4>
            <Element name="🚦 Feu rouge" />
            <Element name="⭕ Rond-point" />
            <Element name="🚧 Intersection" />

            <h4>🛣️ Routes</h4>
            <Element name="➡️ Rue principale" />
            <Element name="⬅️ Rue secondaire" />

            <h4>🔀 Flèches de direction</h4>
            <Element name="⬆️" />
            <Element name="⬇️" />
            <Element name="➡️" />
            <Element name="⬅️" />

            <p style={{ marginTop: '10px', fontStyle: 'italic' }}>
              Cliquez sur un élément dans la scène pour le supprimer.
            </p>
          </div>

          <div className="scene" style={{ flex: 1 }}>
            <Scene elements={elements} setElements={setElements} onDrop={handleDrop} />
          </div>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={() => navigate('/circonstance-b')}>Précédent</button>
          <button onClick={() => navigate('/verification')}>Suivant</button>
        </div>
      </div>
    </DndProvider>
  );
};

export default Croquis;