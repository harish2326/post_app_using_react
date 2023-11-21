import React, { useEffect, useState } from 'react'

const useWindowSize = () => {
    const [windowSize,setWindowSize] = useState({
        height:undefined,
        width:undefined
    })
    
useEffect(() => {
    const handleResize = () => {
        console.log('Resized!');
        setWindowSize({
            height: window.innerHeight,
            width: window.innerWidth
        });
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
}, []);


  return windowSize;
}

export default useWindowSize