import React, { useState, useEffect } from 'react';

const CurrentTime = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(new Date());
    }, 1000);
    
    return () => {
        clearInterval(interval);
      };
    }, []);

    return (
        <div id='current-time-display'>
            <p id='current-time'>{currentTime.toLocaleTimeString()}</p>
        </div>
    );
}

export default CurrentTime;
