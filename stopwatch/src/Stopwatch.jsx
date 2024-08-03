import React, { useEffect, useState, useRef } from "react"

function Stopwatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10)
        }
        return ()=> {
            clearInterval(intervalIdRef.current);
        }
    }, [isRunning])

    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }
    function stop() {
        setIsRunning(false);
        //clearInterval(intervalIdRef.current);

    }
    function reset() {
        setIsRunning(false);
        //clearInterval(intervalIdRef.current);
        setElapsedTime(0);
    }
    function formatTime() {
        let hours = Math.floor(elapsedTime/(1000*60*60));
        hours = String(hours).padStart(2,"0");
        let minutes = Math.floor(elapsedTime/(1000*60)%60);
        minutes = String(minutes).padStart(2,"0");
        let seconds = Math.floor(elapsedTime/(1000)%60);
        seconds = String(seconds).padStart(2,"0");
        let milliseconds = Math.floor((elapsedTime%1000)/10);
        milliseconds = String(milliseconds).padStart(2,"0");
        return `${minutes}:${seconds}:${milliseconds}`
        return "00:00:00";
    }
    return (
        <div className="stopwatch">
            <div className="display">{formatTime()}</div>
            <div className="controls">
                <button onClick={start} className="start-button">Start</button>
                <button onClick={stop} className="stop-button">Stop</button>
                <button onClick={reset} className="reset-button">Reset</button>
            </div>
        </div>
    )
}

export default Stopwatch