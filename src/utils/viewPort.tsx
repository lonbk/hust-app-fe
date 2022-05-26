import { useState, useEffect } from 'react';

export const useViewport = () => {
    const [viewport, setViewport] = useState({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
        setViewport({ width: window.innerWidth, height: window.innerHeight });
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return viewport;
}