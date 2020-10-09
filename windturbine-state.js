/*global log*/
/*global updateState*/
/*global updateProperty*/
/*jslint node: true*/

"use strict";

var opdata = [
    [0,1,2,'NONE'],
    [1,2,3,'NONE'],
    [2,3,4,'NONE'],
    [3,4,5,'NONE'],
    [4,5,6,'NONE'],
    [5,6,7,'NONE'],
    [6,7,8,'NONE'],
    [7,8,9,'NONE'],
    [8,9,10,'NONE'],
    [9,10,11,'NONE']
];

// Default state
var state = {
    index: 0,
    power: 1,
    windDirection: 0,
    state: 'NONE'
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

    var index = state.index + 1;
    if (index >= opdata.length) index = 0;

    // update state 
    var next = opdata[index];

    state.index = next[0];
    state.power = next[1];
    state.windDirection = next[2];
    state.state = 'NONE';

    // // calc total count
    // if (previousProperties.errorStatus != "STATUS_E01")
    // {
    //     properties.errorStatus = "None";
    //     updateProperty("errorStatus", properties.errorStatus);
    // }

    updateState(state);
}