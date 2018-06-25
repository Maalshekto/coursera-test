(function () {

const LIST_SEPARATOR = ',';
const MAX_ACCEPTABLE_NUMBER_OF_LUNCHES = 3;
const EMPTY_STRING = "";
const NO_LUNCH_SUPPLIED = 0;
const ENJOY_MESSAGE = "Enjoy!"
const TOO_MUCH_MESSAGE = "Too much!"
const EMPTY_MESSAGE = "Please enter data first."
const VALIDITY_VALID = "valid"
const VALIDITY_INVALID = "invalid"

'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);
LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
	$scope.list = "";
	$scope.message = "";
	$scope.validity = "";	
		
	$scope.LunchCheckList = function () {
		var res = retrieveMessage($scope.list);
		$scope.message = res[0]; 
		$scope.validity = res[1];
	}; 
};

/*
 *  Remove unexpected spaces before and after value
 */
function strip(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

/*
 *  Retrieve the message to display to the html page 
 *  Proceed to some cleaning before the check (removal of unwanted spaces / empty elements)
 */
function retrieveMessage(lunchString) {
	var lunchList = lunchString.split(LIST_SEPARATOR);
	lunchList = lunchList.map(strip).filter(function(l) { return l != EMPTY_STRING});

	var msg = ""
	var validity = "";
	if (lunchList.length == NO_LUNCH_SUPPLIED) {
		msg = EMPTY_MESSAGE;
		validity = VALIDITY_INVALID;
	}
	else if (lunchList.length <= MAX_ACCEPTABLE_NUMBER_OF_LUNCHES) {
		msg = ENJOY_MESSAGE
		validity = VALIDITY_VALID;
	}
	else {
		msg = TOO_MUCH_MESSAGE
		validity = VALIDITY_VALID;
	}
	return [ msg, validity ];
}

})();
