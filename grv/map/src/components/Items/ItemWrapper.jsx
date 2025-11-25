import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useApp } from '../../context/AppContext';
import { X } from 'lucide-react';
import TextItem from './TextItem';
import ImageItem from './ImageItem';
import DateItem from './DateItem';

const ItemWrapper = ({ item }) => {
    const { updateItem, bringToFront, deleteItem } = useApp();
    const [showControls, setShowControls] = useState(false);
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: item.id,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        position: 'absolute',
        left: item.x,
        top: item.y,
        zIndex: item.zIndex,
        touchAction: 'none',
        opacity: isDragging ? 0.8 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
    };

    const handlePointerDown = () => {
        bringToFront(item.id);
        setShowControls(true);
    };

    // Hide controls when clicking elsewhere is tricky with dnd-kit overlay
    // For now, toggle on click if not dragging? 
    // Or just show controls when active.
    // Let's use a simple toggle for now, or a timeout to hide?
    // Better: Show controls when tapped, hide when tapping 'X'.

    const renderContent = () => {
        switch (item.type) {
            case 'text':
                return <TextItem item={item} />;
            case 'image':
                return <ImageItem item={item} />;
            case 'date':
                return <DateItem item={item} />;
            default:
                return null;
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            onPointerDown={handlePointerDown}
            onPointerLeave={() => setShowControls(false)} // Desktop hover behavior
        >
            {showControls && !isDragging && (
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent drag start
                        deleteItem(item.id);
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '-10px',
                        background: 'var(--color-danger)',
                        color: 'white',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        zIndex: 100,
                    }}
                >
                    <X size={14} />
                </button>
            )}
            {renderContent()}
        </div>
    );
};

export default ItemWrapper;
