import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Type, Image as ImageIcon, Calendar, Palette } from 'lucide-react';

const Toolbar = () => {
    const { addItem, updateBoard, activeBoardId } = useApp();
    const fileInputRef = useRef(null);
    const dateInputRef = useRef(null);

    const style = {
        position: 'fixed',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        padding: '10px 20px',
        borderRadius: '50px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        display: 'flex',
        gap: '20px',
        zIndex: 1000,
    };

    const btnStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        fontSize: '10px',
        color: 'var(--color-text-secondary)',
    };

    const iconStyle = {
        padding: '10px',
        background: 'var(--color-bg-start)',
        borderRadius: '50%',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                addItem('image', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDateSelect = (e) => {
        if (e.target.value) {
            addItem('date', e.target.value);
        }
    };

    const changeBackground = () => {
        const gradients = [
            'linear-gradient(135deg, #fff1eb 0%, #ace0f9 100%)',
            'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
            'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
            'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
            'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
        ];
        // Simple random cycle for now
        const current = gradients.indexOf(document.body.style.background); // This won't work easily with context
        // Just pick random
        const random = gradients[Math.floor(Math.random() * gradients.length)];
        updateBoard(activeBoardId, { backgroundColor: random });
    };

    return (
        <div style={style}>
            <button style={btnStyle} onClick={() => addItem('text', 'New Dream')}>
                <div style={iconStyle}><Type size={20} color="#6c5ce7" /></div>
                Text
            </button>

            <button style={btnStyle} onClick={() => fileInputRef.current.click()}>
                <div style={iconStyle}><ImageIcon size={20} color="#00b894" /></div>
                Image
            </button>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleImageUpload}
            />

            <button style={btnStyle} onClick={() => dateInputRef.current.showPicker()}>
                <div style={iconStyle}><Calendar size={20} color="#0984e3" /></div>
                Date
            </button>
            <input
                type="date"
                ref={dateInputRef}
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                onChange={handleDateSelect}
            />

            <button style={btnStyle} onClick={changeBackground}>
                <div style={iconStyle}><Palette size={20} color="#e17055" /></div>
                Theme
            </button>
        </div>
    );
};

export default Toolbar;
