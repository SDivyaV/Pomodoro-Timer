import React, { useState, useEffect } from "react";
import "./App.css";

const PomodoroTimer = () => {
  const [time, setTime] = useState(25 * 60); 
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [customTime, setCustomTime] = useState(25); 

  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(timer);
      setIsRunning(false);
      setIsBreak(!isBreak);
      setTime(isBreak ? customTime * 60 : 5 * 60); 
    }
    return () => clearInterval(timer);
  }, [isRunning, time, isBreak, customTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSliderChange = (e) => {
    const newTime = parseInt(e.target.value);
    setCustomTime(newTime);
    setTime(newTime * 60); // Update actual time
  };

  return (
    <div>
      <h1>Pomodoro Timer</h1>
      <div className="pomodoro-container">
        {/* Timer Display */}
        <h2 className={`timer ${time < 10 ? "red-blink" : ""}`}>
          {formatTime(time)}
        </h2>
        <p>{isBreak ? "Break Time" : "Work Time"}</p>

        {/* Timer Range Slider */}
        <div className="slider-container">
          <label>Set Timer: {customTime} min</label>
          <input
            type="range"
            min="1"
            max="60"
            value={customTime}
            onChange={handleSliderChange}
            disabled={isRunning} // Disable slider when timer is running
          />
        </div>

        {/* Control Buttons */}
        <div className="buttons">
          <button onClick={() => setIsRunning(true)}>Start</button>
          <button onClick={() => setIsRunning(false)}>Pause</button>
          <button
            onClick={() => {
              setIsRunning(false);
              setTime(customTime * 60);
            }}
          >
            Restart
          </button>
          <button onClick={() => setTime(time + 60)}>+1 Min</button>
          <button
            onClick={() => {
              setIsRunning(false);
              setTime(5 * 60);
              setIsBreak(true);
            }}
          >
            Break
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
