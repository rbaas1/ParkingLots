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
    })
    .when("/parkingPage", {
            templateUrl : "parkingPage.html",
            controller : "parkingLotCtrl"
    });
});

app.controller("addCarCtrl", function ($scope, $http) {

    $scope.msg = "";

    $scope.save = function ()  {
        console.log('saving');

        $http.post('api/new/car', angular.toJson($scope.car)).then(function () {
                console.log($scope.car.parkingLot);
            	console.log('saved!' + $scope.car.licensePlate);
            	$scope.msg = "Added " + $scope.car.licensePlate;
            });
      };

    $scope.loadParking = function ()  {
            console.log('loading parking');
            function handleSuccess(response){
                 $scope.parkinglots = response.data;
               }

            function handleError(response) {
                  // handle errors
               }

            $http.get('api/parkinglot/all').
              then(handleSuccess).
              catch(handleError);
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
        $http.delete("api/car/" + id).then(function () {
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

   $scope.msg = "I want to know all about this car";
});

app.controller("parkingLotCtrl", function ($scope, $http) {

    $scope.msg = "";

    $scope.save = function ()  {
        console.log('saving parking');

        $http.post('api/new/parkinglot', angular.toJson($scope.parkingLot)).then(function () {
                console.log('saved!' + $scope.parkingLot.location);
            	$scope.msg = "Added " + $scope.parkingLot.location;
            });
      };

    $scope.loadParking = function ()  {
            console.log('loading parking');
            function handleSuccess(response){
                 $scope.parkinglots = response.data;
               }

            function handleError(response) {
                  // handle errors
               }

            $http.get('api/parkinglot/all').
              then(handleSuccess).
              catch(handleError);
        };

    $scope.delete = function (id)  {
            console.log('deleting');
            $http.delete("api/parkinglot/" + id).then(function () {
            	$scope.loadParking();
            });
        };

    $scope.valdellot = function (id, length) {
            console.log('validating lot:' + id + ', with length: ' + length);
            var x = false;
            if (id != 0) x = true;
            if (length > 0) x = false;
            return x;
            }
});