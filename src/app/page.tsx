// src/app/page.tsx
import React from 'react';
import AlchemyRequest from '@/components/AlchemyRequest';

export default function Burner() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2rem',
                maxWidth: '1100px',
                margin: '0 auto',
                textAlign: 'center',
                background: 'transparent',
            }}
        >
            <AlchemyRequest />
        </div>
    );
}
