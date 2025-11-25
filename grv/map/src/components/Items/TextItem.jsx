import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

const TextItem = ({ item }) => {
    const { updateItem } = useApp();
    const [isEditing, setIsEditing] = useState(false);
    const textareaRef = useRef(null);

    const style = {
        padding: '10px',
        background: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(4px)',
        borderRadius: '8px',
        minWidth: '100px',
        maxWidth: '300px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        cursor: 'text',
        fontSize: item.fontSize || '16px',
        color: item.color || '#333',
        whiteSpace: 'pre-wrap',
    };

    const handleDoubleClick = (e) => {
        e.stopPropagation(); // Prevent drag start on double click if possible
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
        if (textareaRef.current) {
            updateItem(item.id, { content: textareaRef.current.value });
        }
    };

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [isEditing]);

    if (isEditing) {
        return (
            <textarea
                ref={textareaRef}
                defaultValue={item.content}
                onBlur={handleBlur}
                style={{
                    ...style,
                    width: '200px',
                    height: '100px',
                    border: '2px solid var(--color-accent)',
                    outline: 'none',
                }}
                onPointerDown={(e) => e.stopPropagation()} // Allow interaction with textarea
            />
        );
    }

    return (
        <div
            style={style}
            onDoubleClick={handleDoubleClick}
            onTouchEnd={(e) => {
                // Simple double tap detection could be added here
            }}
        >
            {item.content || 'Double click to edit'}
        </div>
    );
};

export default TextItem;
