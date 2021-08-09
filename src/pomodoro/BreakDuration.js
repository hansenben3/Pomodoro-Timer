import React from "react";

function calculateTime (value) {
    if (value < 10){
        return "0" + value + ":00";
    }
    else{
        return value + ":00";
    }
}

function breakDuration (props) {

    return (

        <div className="col">
            <div className="float-right">
                <div className="input-group input-group-lg mb-2">
                    <span className="input-group-text" data-testid="duration-break">
                    {/* TODO: Update this text to display the current break session duration */}
                    Break Duration: {calculateTime(props.breakDuration)}
                    </span>
                    <div className="input-group-append">
                        {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                        <button
                            onClick={() => props.onClickHandler("break", "decrease")}
                            type="button"
                            className="btn btn-secondary"
                            data-testid="decrease-break"
                            disabled={props.isTimerRunning || props.session !== null}
                        >
                            <span className="oi oi-minus" />
                        </button>
                        {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                        <button
                            onClick={() => props.onClickHandler("break", "increase")}
                            type="button"
                            className="btn btn-secondary"
                            data-testid="increase-break"
                            disabled={props.isTimerRunning || props.session !== null}
                        >
                            <span className="oi oi-plus" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );

}

export default breakDuration;