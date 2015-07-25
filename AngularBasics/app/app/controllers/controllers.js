/**
 * Created by Radi on 7/25/2015.
 */
'use strict';
basicApp.controller('FooterCtrl', function FooterCtrl($scope) {
    $scope.author = "Radi Shikerov";
    $scope.currentDate = new Date();
    $scope.copyrights = 'Copyright ©ARCHANGEL 2015';
});


var phoneControllers = angular.module('phoneControllers', []);

phoneControllers.controller('PhonesCtrl', ['$scope','$http',
    function ($scope, $http){
        $http.get('app/data/phones.json').success(function(data){
            $scope.phones = data; // data.splice(0, 5);
        });

        $scope.orderProp = '-year'; // set default  value
    }
]);

phoneControllers.controller('PhoneDetailsCtrl', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        $http.get('app/data/' + $routeParams.phoneId + '.json').success(function(data) {
            $scope.phone = data;

            var details = [];
            for (var property in data) {
                if (data.hasOwnProperty(property)) {
                    if(property != "id" &&
                        property != "name" &&
                        property != "manufacturer" &&
                        property != "imageURL"){
                        details.push({
                            "title" : property,
                            "value" : data[property]
                        });
                    }
                }
            }

            $scope.details = details;
            console.log(details);
        });
    }
]);
