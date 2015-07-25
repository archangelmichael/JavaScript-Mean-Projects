/**
 * Created by Radi on 7/25/2015.
 */
'use strict';
var phoneFilters = angular.module('phoneFilters', []);

phoneFilters.filter('checkmark', function() {
    return function(input) {
        return input ? '\u2713' : '\u2718';
    };
});