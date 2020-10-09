/*global log*/
/*global updateState*/
/*global updateProperty*/
/*global sleep*/
/*jslint node: true*/

"use strict";

// Default properties
var properties = {
    errorStatus: "STATUS_E02"
};

/**
 * Entry point function called by the simulation engine.
 *
 * @param context        The context contains current time, device model and id
 * @param previousState  The device state since the last iteration
 * @param previousProperties  The device properties since the last iteration
 */
/*jslint unparam: true*/
function main(context, previousState, previousProperties) {

    var state = {
        power: 1,
        windDirection: 0,
        state: "STATUS_E02"
    };

    // change status
    properties.errorStatus = "STATUS_E02";
    
    updateState(state);
    updateProperty("errorStatus", properties.errorStatus);
}