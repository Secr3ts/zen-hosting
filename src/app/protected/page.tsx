import React from 'react';

const ProtectedPage: React.FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h1>Protected</h1>
        </div>
    );
};

export default ProtectedPage;