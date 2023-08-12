// This interface defines the structure of the DisplayState object.
// It represents the current state of a timer display.
export interface DisplayState {
    time: number;                   // Current time value in seconds.
    timeType: "Session" | "Break";  // Indicates whether it's session time or break time.
    timerRunning: boolean;          // Indicates whether the timer is currently running.
  }
  
  // This function takes a time value in seconds and returns a formatted string representing the time in minutes and seconds.
  export const formatTime = (time: number): string => {
    // Calculate the whole number of minutes by dividing the time by 60.
    const minutes = Math.floor(time / 60);
  
    // Calculate the remaining seconds after accounting for the whole minutes.
    const seconds = time % 60;
  
    // Create a formatted string combining minutes and seconds.
    // If minutes is less than 10, add a leading zero. Otherwise, use the value as is.
    const formattedMinutes = minutes < 10 ? "0" + minutes.toString() : minutes;
  
    // If seconds is less than 10, add a leading zero. Otherwise, use the value as is.
    const formattedSeconds = seconds < 10 ? "0" + seconds.toString() : seconds;
  
    // Combine formatted minutes and seconds using a colon as a separator.
    const formattedTime = `${formattedMinutes}:${formattedSeconds}`;
  
    // Return the final formatted time string.
    return formattedTime;
  };
  