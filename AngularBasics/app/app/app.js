/**
 * Created by Radi on 7/25/2015.
 */
'use strict';
var basicApp = angular.module('basicApp', ['ngRoute', 'phoneControllers']);

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
            otherwise({
                redirectTo: '/phones'
            });
    }
]);