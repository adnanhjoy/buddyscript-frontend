import React from 'react';

const loading: React.FC = () => {
    return (
        <div className='flex items-center justify-center h-screen w-full'>
            <h1 className="text-muted-foreground">Loading...</h1>
        </div>
    );
};

export default loading;