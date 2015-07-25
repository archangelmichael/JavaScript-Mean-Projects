/**
 * Created by Radi on 7/25/2015.
 */
'use strict';
var basicApp = angular.module('basicApp', ['ngRoute', 'phoneControllers', 'phoneFilters', 'phoneAnimations']);

basicApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/phones', {
                templateUrl: 'app/partials/phone-list.html',
                controller: 'PhonesCtrl'
            }).
            when('/phones/:phoneId', {
                templateUrl: 'app/partials/phone-details.html',
                controller: 'PhoneDetailsCtrl'
            }).
            when('/basics', {
                templateUrl: 'app/partials/basics.html',
                controller: 'BasicsCtrl'
            }).
            otherwise({
                redirectTo: '/phones'
            });
    }
]);