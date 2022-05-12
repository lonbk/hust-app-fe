/* Libs */
import React from 'react';

export const Appointments: React.FC = () => {

    const [count, setCount] = React.useState(0)

    return (
        <>
            <button onClick={() => setCount(prev => prev++)}>abc</button>
        </>
    )
}