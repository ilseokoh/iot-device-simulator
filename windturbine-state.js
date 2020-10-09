/*global log*/
/*global updateState*/
/*global updateProperty*/
/*jslint node: true*/

"use strict";

// Default state
var state = {
    power: 1,
    windDirection: 0,
    state: "NONE"
};

// Default properties
// errorStatus: NONE, STATUS_E01, STATUS_E02
var properties = {
    errorStatus: "NONE"
};

/**
 * Restore the global state using data from the previous iteration.
 *
 * @param previousState device state from the previous iteration
 * @param previousProperties device properties from the previous iteration
 */
function restoreSimulation(previousState, previousProperties) {
    // If the previous state is null, force a default state
    if (previousState) {
        state = previousState;
    } else {
        log("Using default state");
    }

    if (previousProperties) {
        properties = previousProperties;
    } else {
        log("Using default properties");
    }
}

/**
 * Entry point function called by the simulation engine.
 * Returns updated simulation state.
 * Device property updates must call updateProperties() to persist.
 *
 * @param context             The context contains current time, device model and id
 * @param previousState       The device state since the last iteration
 * @param previousProperties  The device properties since the last iteration
 */
/*jslint unparam: true*/
function main(context, previousState, previousProperties) {

    // Restore the global device properties and the global state before
    // generating the new telemetry, so that the telemetry can apply changes
    // using the previous function state.
    restoreSimulation(previousState, previousProperties);

    // just increse power
    state.power = previousState.hit + 1;
    state.windDirection = previousState.windDirection + 1;
    // calc total count
    if (previousProperties.errorStatus != "STATUS_E01")
    {
        properties.errorStatus = "None";
        updateProperty("errorStatus", properties.errorStatus);
    }

    updateState(state);
}