import { useState, useEffect } from 'react';
import AlarmSound from "./assets/AlarmSound.mp3";
import './App.css';
import { DisplayState } from './helpers';
import TimeSetter from './TimeSetter';
import Display from './Display';

const defaultBreakTime = 5 * 60;
const defaultSessionTime = 25 * 60;
const min = 60;
const max = 60 * 60;
const interval = 60;

function App() {
  // State for break time, session time, and display state
  const [breakTime, setBreakTime] = useState(defaultBreakTime);
  const [sessionTime, setSessionTime] = useState(defaultSessionTime);
  const [displayState, setDisplayState] = useState<DisplayState>({
    time: sessionTime,
    timeType: "Session",
    timerRunning: false,
  });

  // Effect to update the timer every second when running
  useEffect(() => {
    let timerID: number;
    if (!displayState.timerRunning) return;

    if (displayState.timerRunning) {
      timerID = window.setInterval(decrementDisplay, 1000);
    }

    return () => {
      window.clearInterval(timerID);
    };
  }, [displayState.timerRunning]);

  // Effect for audio playback and timer transition
  useEffect(() => {
    if (displayState.time === 0) {
      const audio = document.getElementById("beep") as HTMLAudioElement;
      audio.currentTime = 0;
      audio.play().catch((err) => console.log(err));

      // Transition to the next session/break
      setDisplayState((prev) => ({
        ...prev,
        timeType: prev.timeType === "Session" ? "Break" : "Session",
        time: prev.timeType === "Session" ? breakTime : sessionTime,
      }));
    }
  }, [displayState, breakTime, sessionTime]);

  // Function to reset the timer
  const reset = () => {
    setBreakTime(defaultBreakTime);
    setSessionTime(defaultSessionTime);
    setDisplayState({
      time: defaultSessionTime,
      timeType: "Session",
      timerRunning: false,
    });

    // Pause and reset audio playback
    const audio = document.getElementById("beep") as HTMLAudioElement;
    audio.pause();
    audio.currentTime = 0;
  };

  // Function to start/stop the timer
  const startStop = () => {
    setDisplayState((prev) => ({
      ...prev,
      timerRunning: !prev.timerRunning,
    }));
  };

  // Function to change break time
  const changeBreakTime = (time: number) => {
    if (displayState.timerRunning) return;
    setBreakTime(time);
  };

  // Function to decrement the timer display
  const decrementDisplay = () => {
    setDisplayState((prev) => ({
      ...prev,
      time: prev.time - 1,
    }));
  };

  // Function to change session time
  const changeSessionTime = (time: number) => {
    if (displayState.timerRunning) return;
    setSessionTime(time);
    setDisplayState({
      time: time,
      timeType: "Session",
      timerRunning: false,
    });
  };

  return (
    <div className="timer">
      <h1>Pomodoro Timer</h1>
      <div className="container">
        {/* Display component */}
        <Display
          displayState={displayState}
          reset={reset}
          startStop={startStop}
        />
        <div className="setters">
          <div className="break">
            {/* Break time setter */}
            <h4 id="break-label">Break Length</h4>
            <TimeSetter
              time={breakTime}
              setTime={changeBreakTime}
              min={min}
              max={max}
              interval={interval}
              type="break"
            />
          </div>
          <div className="session">
            {/* Session time setter */}
            <h4 id="session-label">Session Length</h4>
            <TimeSetter
              time={sessionTime}
              setTime={changeSessionTime}
              min={min}
              max={max}
              interval={interval}
              type="session"
            />
          </div>
        </div>
        {/* Audio element for alarm sound */}
        <audio id="beep" src={AlarmSound} />
      </div>
    </div>
  );
}

export default App;
