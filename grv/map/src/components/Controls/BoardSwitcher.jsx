import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Trash2, Layout } from 'lucide-react';

const BoardSwitcher = () => {
    const { boards, activeBoardId, setActiveBoardId, addBoard, deleteBoard } = useApp();
    const [isOpen, setIsOpen] = useState(false);

    const style = {
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 1000,
    };

    const menuStyle = {
        background: 'white',
        borderRadius: '12px',
        padding: '10px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        marginTop: '10px',
        display: isOpen ? 'block' : 'none',
        minWidth: '200px',
    };

    const itemStyle = (isActive) => ({
        padding: '8px 12px',
        borderRadius: '8px',
        cursor: 'pointer',
        background: isActive ? 'var(--color-accent)' : 'transparent',
        color: isActive ? 'white' : 'var(--color-text-primary)',
        marginBottom: '4px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    });

    return (
        <div style={style}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    background: 'white',
                    padding: '10px',
                    borderRadius: '50%',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Layout size={24} color="var(--color-text-primary)" />
            </button>

            <div style={menuStyle}>
                <div style={{ fontWeight: 'bold', marginBottom: '10px', padding: '0 5px' }}>My Boards</div>
                {boards.map(board => (
                    <div
                        key={board.id}
                        style={itemStyle(board.id === activeBoardId)}
                        onClick={() => {
                            setActiveBoardId(board.id);
                            setIsOpen(false);
                        }}
                    >
                        <span>{board.name}</span>
                        {boards.length > 1 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (confirm('Delete this board?')) deleteBoard(board.id);
                                }}
                                style={{ opacity: 0.6, marginLeft: '10px' }}
                            >
                                <Trash2 size={14} />
                            </button>
                        )}
                    </div>
                ))}
                <button
                    onClick={() => {
                        const name = prompt('Board Name:');
                        if (name) addBoard(name);
                    }}
                    style={{
                        width: '100%',
                        padding: '8px',
                        marginTop: '10px',
                        border: '1px dashed #ccc',
                        borderRadius: '8px',
                        color: 'var(--color-text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px'
                    }}
                >
                    <Plus size={16} /> New Board
                </button>
            </div>
        </div>
    );
};

export default BoardSwitcher;
