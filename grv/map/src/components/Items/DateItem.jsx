import React from 'react';

const DateItem = ({ item }) => {
    const targetDate = new Date(item.content);
    const today = new Date();
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const style = {
        padding: '10px 15px',
        background: 'linear-gradient(135deg, #a29bfe, #6c5ce7)',
        color: 'white',
        borderRadius: '20px',
        boxShadow: '0 4px 10px rgba(108, 92, 231, 0.3)',
        textAlign: 'center',
        minWidth: '120px',
    };

    return (
        <div style={style}>
            <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                {targetDate.toLocaleDateString()}
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                {diffDays > 0 ? `${diffDays} Days Left` : 'Today!'}
            </div>
        </div>
    );
};

export default DateItem;
