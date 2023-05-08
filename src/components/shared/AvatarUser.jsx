import React from 'react';

const Avatar = ({ username, size = 48 }) => {
    const initialLetter = username.charAt(0).toUpperCase();
    // const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: size,
                height: size,
                borderRadius: '50%',
                backgroundColor: 'grey',
                color: '#fff',
                fontWeight: 500,
                fontSize: size / 2,
                textTransform: 'uppercase',
            }}
        >
            {initialLetter}
        </div>
    );
};

export default Avatar;
