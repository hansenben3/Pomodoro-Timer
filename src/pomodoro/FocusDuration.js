import React from "react";

function calculateTime (value) {
    if (value < 10){
        return "0" + value + ":00";
    }
    else{
        return value + ":00";
    }
}

function focusDuration (props) {

    return (

        <div className="col">
            <div className="input-group input-group-lg mb-2">
                <span className="input-group-text" data-testid="duration-focus">
                    {/* TODO: Update this text to display the current focus session duration */}
                    Focus Duration: {calculateTime(props.focusDuration)}
                </span>
                <div className="input-group-append">
                    {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
                    <button
                        onClick={() => props.onClickHandler("focus", "decrease")}
                        type="button"
                        className="btn btn-secondary"
                        data-testid="decrease-focus"
                        disabled={props.isTimerRunning || props.session !== null}
                    >
                    <span className="oi oi-minus" />
                    </button>
                    {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
                    <button
                        onClick={() => props.onClickHandler("focus", "increase")}
                        type="button"
                        className="btn btn-secondary"
                        data-testid="increase-focus"
                        disabled={props.isTimerRunning || props.session !== null}
                    >
                    <span className="oi oi-plus" />
                    </button>
                </div>
            </div>
        </div>
    )

}

export default focusDuration;