// Import necessary dependencies and types from other files
import { DisplayState, formatTime } from "./helpers";
import { FaPlay, FaPause, FaUndo } from "react-icons/fa";

// Props interface for the Display component
interface DisplayProps {
  displayState: DisplayState;       // Current display state of the timer
  reset: () => void;                // Function to reset the timer
  startStop: (displayState: DisplayState) => void; // Function to start or stop the timer
}

// Display component definition
const Display: React.FC<DisplayProps> = ({
  displayState,
  reset,
  startStop,
}) => {
  return (
    <div className="display">
      {/* Display the current time type (Session or Break) */}
      <h4 id="timer-label">{displayState.timeType}</h4>
      
      {/* Display the remaining time, and change the color based on whether the timer is running */}
      <span
        id="time-left"
        style={{ color: `${displayState.timerRunning ? "red" : "white"}` }}
      >
        {formatTime(displayState.time)}
      </span>
      
      <div>
        {/* Button to start or pause the timer */}
        <button id="start_stop" onClick={() => startStop(displayState)}>
          {displayState.timerRunning ? <FaPause /> : <FaPlay />}
        </button>
        
        {/* Button to reset the timer */}
        <button id="reset" onClick={reset}>
          <FaUndo />
        </button>
      </div>
    </div>
  );
};

export default Display; // Export the Display component
