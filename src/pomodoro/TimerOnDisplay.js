import React from "react";

function TimerOnDisplay (props) {

    function calculateTime () {
        if(props.session.label === "Focusing"){
            const value = props.focusDuration;
            if (value < 10){
                return "0" + value + ":00";
            }
            else{
                return value + ":00";
            }
        }
        else{
            const value = props.breakDuration;
            if (value < 10){
                return "0" + value + ":00";
            }
            else{
                return value + ":00";
            }
        }
    }

    function calculateTimeRemaining (time) {
        let min = Math.floor(time/60);
        let sec = time%60;

        sec = sec < 10 ? "0" + sec : sec;
    
        return min + ":" + sec;
    }

    function valNow () {
        if (props.session.label === "Focusing"){
            return (props.focusDuration*60-props.session.timeRemaining)/(props.focusDuration*60)*100;
        }
        else{
            return (props.breakDuration*60-props.session.timeRemaining)/(props.breakDuration*60)*100;
        }
    }

    function widthPercentage () {
        if (props.session.label === "Focusing"){
            return (props.focusDuration*60-props.session.timeRemaining)/(props.focusDuration*60)*100 + "%";
        }
        else{
            return (props.breakDuration*60-props.session.timeRemaining)/(props.breakDuration*60)*100 + "%";
        }
    }

    if(props.session !== null){
    return (
    <div>
    {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
    <div className="row mb-2">
      <div className="col">
        {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
        <h2 data-testid="session-title">
          {props.session?.label} for {calculateTime()} minutes                      
        </h2>
        {/* TODO: Update message below correctly format the time remaining in the current session */}
        <p className="lead" data-testid="session-sub-title">
          {calculateTimeRemaining(props.session?.timeRemaining)} remaining
        </p>
        {props.isTimerRunning === false ? <p>PAUSED</p> : null}
      </div>
    </div>
    <div className="row mb-2">
      <div className="col">
        <div className="progress" style={{ height: "20px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={valNow()} // TODO: Increase aria-valuenow as elapsed time increases
            style={{ width: widthPercentage()}} // TODO: Increase width % as elapsed time increases
          />
        </div>
      </div>
    </div>
  </div>
    )
    }
    else{
        return null;
    }
}

export default TimerOnDisplay;