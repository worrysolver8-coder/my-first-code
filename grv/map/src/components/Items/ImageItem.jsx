import React from 'react';

const ImageItem = ({ item }) => {
    const style = {
        padding: '5px',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        width: item.width || '200px',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    return (
        <div style={style}>
            {item.content ? (
                <img
                    src={item.content}
                    alt="Dream"
                    style={{
                        width: '100%',
                        borderRadius: '4px',
                        pointerEvents: 'none' // Prevent browser image drag
                    }}
                />
            ) : (
                <div style={{ padding: '20px', color: '#ccc' }}>No Image</div>
            )}
        </div>
    );
};

export default ImageItem;
