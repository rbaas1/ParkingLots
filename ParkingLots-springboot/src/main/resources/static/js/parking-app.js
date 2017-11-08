var app = angular.module("parkingApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "main.html",
    })
    .when("/addCar", {
        templateUrl : "addCar.html",
        controller : "addCarCtrl"
    })
    .when("/viewCar", {
        templateUrl : "viewCar.html",
        controller : "viewCarCtrl"
    })
    .when("/listCars", {
        templateUrl : "listCars.html",
        controller : "viewCarCtrl"
    });
});

app.controller("addCarCtrl", function ($scope, $http) {

    $scope.save = function ()  {
        console.log('saving');
        $http.post('new/car', angular.toJson($scope.car)).then(function () {
            	console.log('saved!');
            });
      };
});

app.controller("viewCarCtrl", function ($scope, $http) {

    $scope.loadCars = function ()  {
        console.log('loading');
        function handleSuccess(response){
             $scope.cars = response.data;
           }

        function handleError(response) {
              // handle errors
           }

        $http.get('api/car/all').
          then(handleSuccess).
          catch(handleError);
    };

    $scope.delete = function (id)  {
        console.log('deleting');
        $http.delete("car/" + id).then(function () {
        	$scope.loadCars();
        });
    };

    $scope.searchByPlate = function (licensePlate)  {
            console.log('searching');
            if (licensePlate == "") return;
            function handleSuccess(response){
                 $scope.cars = response.data;
                 console.log('found!');
               }

            function handleError(response) {
                  // handle errors
               }

            $http.get('api/cardetail/' + licensePlate).
              then(handleSuccess).
              catch(handleError);
        };

   $scope.msg = "I want to know all abaout cars";
});
