import { FaArrowDown, FaArrowUp } from "react-icons/fa";

// Props interface for the TimeSetter component
interface TimeSetterProps {
  time: number;                    // Current time value
  setTime: (time: number) => void; // Function to update the time value
  min: number;                     // Minimum allowed time value
  max: number;                     // Maximum allowed time value
  interval: number;                // Increment/decrement interval
  type: "break" | "session";       // Type of time (break or session)
}

// TimeSetter component definition
const TimeSetter: React.FC<TimeSetterProps> = ({
  time,
  setTime,
  min,
  max,
  interval,
  type,
}) => {
  return (
    <div>
      {/* Button to decrement time */}
      <button
        onClick={() => (time > min ? setTime(time - interval) : null)}
        id={`${type}-decrement`}
      >
        <FaArrowDown /> {/* Display the arrow icon */}
      </button>
      
      {/* Display the time value */}
      <span id={`${type}-length`}>{time / interval}</span>
      
      {/* Button to increment time */}
      <button
        onClick={() => (time < max ? setTime(time + interval) : null)}
        id={`${type}-increment`}
      >
        <FaArrowUp /> {/* Display the arrow icon */}
      </button>
    </div>
  );
};

export default TimeSetter; // Export the TimeSetter component
