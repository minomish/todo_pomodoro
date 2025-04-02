import React, { useState, useEffect } from "react";
import "./Pomodoro.css";

const Pomodoro = () => {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("work"); 
  const [customMinutes, setCustomMinutes] = useState(25);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            handleTimerEnd();
            return getModeTime();
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, mode]);

  const getModeTime = () => {
    if (mode === "work") return 25 * 60;
    if (mode === "shortBreak") return 5 * 60;
    if (mode === "longBreak") return 15 * 60;
    return 25 * 60;
  };

  const handleTimerEnd = () => {
    if (mode === "work") setMode("shortBreak");
    else setMode("work");
    setTime(getModeTime());
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    
    if (newMode === "work") setTime(25 * 60);
    if (newMode === "shortBreak") setTime(5 * 60);
    if (newMode === "longBreak") setTime(15 * 60);
  };
  

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(getModeTime());
  };

  const increaseTime = () => {
    setCustomMinutes((prev) => Math.min(prev + 1, 120));
    setTime((customMinutes + 1) * 60);
  };

  const decreaseTime = () => {
    setCustomMinutes((prev) => Math.max(prev - 1, 1));
    setTime((customMinutes - 1) * 60);
  };

  const handleCustomTimeChange = (e) => {
    const minutes = parseInt(e.target.value) || 1;
    setCustomMinutes(minutes);
    setTime(minutes * 60);
  };

  return (
    <div className="pomodoro-container">
      <div className="mode-buttons">
        <button
          className={`mode-button ${mode === "work" ? "active" : ""}`}
          onClick={() => handleModeChange("work")}
        >
          Focus
        </button>
        <button
          className={`mode-button ${mode === "shortBreak" ? "active" : ""}`}
          onClick={() => handleModeChange("shortBreak")}
        >
          Short Break
        </button>
        <button
          className={`mode-button ${mode === "longBreak" ? "active" : ""}`}
          onClick={() => handleModeChange("longBreak")}
        >
          Long Break
        </button>
      </div>

      <div className="timer-display">
        {Math.floor(time / 60).toString().padStart(2, "0")}:
        {(time % 60).toString().padStart(2, "0")}
      </div>

      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${(time / getModeTime()) * 100}%` }}
        ></div>
      </div>

      <div className="button-group">
        <button className="button start-button" onClick={handleStartStop}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button className="button reset-button" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div className="time-selector">
        <button className="time-button" onClick={decreaseTime}>-</button>
        <input
          type="number"
          className="time-input"
          value={customMinutes}
          onChange={handleCustomTimeChange}
        />
        <button className="time-button" onClick={increaseTime}>+</button>
      </div>
    </div>
  );
};

export default Pomodoro;
