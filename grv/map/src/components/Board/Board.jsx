import React from 'react';
import { DndContext, useSensor, useSensors, PointerSensor, TouchSensor } from '@dnd-kit/core';
import { useApp } from '../../context/AppContext';
import ItemWrapper from '../Items/ItemWrapper';
import styles from './Board.module.css';

const Board = () => {
    const { activeBoard, moveItem } = useApp();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // Require slight movement to start drag, allowing clicks
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 100,
                tolerance: 5,
            }
        })
    );

    const handleDragEnd = (event) => {
        const { active, delta } = event;
        if (!active) return;

        const item = activeBoard.items.find(i => i.id === active.id);
        if (item) {
            moveItem(item.id, item.x + delta.x, item.y + delta.y);
        }
    };

    return (
        <div
            className={styles.board}
            style={{ background: activeBoard.backgroundColor }}
        >
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                {activeBoard.items.map((item) => (
                    <ItemWrapper key={item.id} item={item} />
                ))}
            </DndContext>
        </div>
    );
};

export default Board;
