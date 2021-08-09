import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import TimerOnDisplay from "./TimerOnDisplay.js";
import  BreakDuration from "./BreakDuration";
import  FocusDuration from "./FocusDuration";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);

  // ToDo: Allow the user to adjust the focus and break duration.
  
  //change these to state or add to the state
  const [focusDuration, setFocus] = useState(25);
  const [breakDuration, setBreak] = useState(5);
  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      // will add the update here happens every second 
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  const stop = () => {

    setSession(null);
    setIsTimerRunning(false);
  }

  function validateStopButton () {
    if(session === null){
      return true;
    }
    else{
      return false;
    }
  }

  const onClickHandler = (type, type2) => {
    if (type === "focus"){
      if(type2 === "increase"){
        if(focusDuration < 60){
          setFocus( prev => prev += 5);
        }
      }
      else {
        if(focusDuration > 5){
          setFocus(prev => prev -= 5);
        }
      }
      return false;
    }
    else{
      if(type2 === "increase"){
        if(breakDuration < 20){
          setBreak(prev => prev += 1);
        }
      }
      else {
        if(breakDuration > 1){
          setBreak(prev => prev -=1);
        }
      }
      return false;
    }
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <FocusDuration session = {session} isTimerRunning = {isTimerRunning} focusDuration = {focusDuration} onClickHandler = {onClickHandler}/>
        <BreakDuration session = {session} isTimerRunning = {isTimerRunning} breakDuration = {breakDuration} onClickHandler = {onClickHandler}/>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session. and disable the stop button when there is no active session */}
            {/* TODO: Disable the stop button when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="stop"
              onClick={stop}
              title="Stop the session"
              disabled={validateStopButton()}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <TimerOnDisplay session = {session} focusDuration = {focusDuration} breakDuration = {breakDuration} isTimerRunning = {isTimerRunning}/>
    </div>
  );
}
export default Pomodoro;
