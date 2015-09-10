angular.module('starter.controllers', ['ngMap', 'ionic', 'ngCordova', 'ngTouch', 'ngRoute', 'ui.router']);

app.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
});

app.controller('MapCtrl', ['$scope', '$rootScope', '$stateParams', '$http', '$timeout', '$cordovaGeolocation', '$ionicPlatform', '$routeParams', 'bars', function($scope, $rootScope, $stateParams, $http, $timeout, $cordovaGeolocation, $ionicPlatform, $routeParams, bars) {

  $http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.7577,-122.4376&radius=30000&types=bar&keyword=gay&opennow&key=AIzaSyATy7HmpP5HnTkO6mGUuiAJFswORqSgk9w')
    .then(function(response) {
      // return an array of bars
      $rootScope.bars = response.data.results;
    });

  $scope.$on('mapInitialized', function (event, map) {
    $scope.objMapa = map;
  });

  // empty array of info windows
  var infoWindows = [];

  $scope.show = function (event, bar) {

      // iterate over all infoWindows and close them
      if (infoWindows.length !== 0) {
        for (var i = 0 ; i < infoWindows.length ; i++) {
          infoWindows[i].close();
        }
      }

      var infowindow = new google.maps.InfoWindow();

      // push this infowindow into a new array of infoindows
      infoWindows.push(infowindow);

      var center = new google.maps.LatLng(bar.geometry.location.lat, bar.geometry.location.lng);

      console.log(bar.id);

      // this doesn't seem to be working, and I have no idea why; it's exactly the same as the code on the browse page
      infowindow.setContent(
          "<p><a href='#/app/bars/" + bar.id + "'>" + bar.name + "</a></p>"
      );

      infowindow.setPosition(center);
      infowindow.open($scope.objMapa);
      $scope.objMapa.setZoom(16);
      $scope.objMapa.setCenter(center);
   };

   // button to zoom to Castro
   var castro = new google.maps.LatLng(37.7625247, -122.4361676);
   $scope.castro = function() {
     console.log(castro);
     $scope.objMapa.setCenter(castro);
     $scope.objMapa.setZoom(16);
   };

   // button to zoom to SoMa
   $scope.soma = function() {
     var soma = new google.maps.LatLng(37.773625, -122.411774);
     $scope.objMapa.setCenter(soma);
     $scope.objMapa.setZoom(16);
   };

   $rootScope.me = function() {

     var posOptions = {timeout: 10000, enableHighAccuracy: false};
     $cordovaGeolocation
       .getCurrentPosition(posOptions)
       .then(function (position) {
         var lat  = position.coords.latitude;
         var lng = position.coords.longitude;

         var infowindow = new google.maps.InfoWindow();

         var me = new google.maps.LatLng(lat, lng);
         $scope.objMapa.setCenter(me);
         $scope.objMapa.setZoom(16);

         infowindow.setContent(
             '<p>' + " Bitch, we found you " + '</p>'
         );

         infowindow.setPosition(me);
         infowindow.open($scope.objMapa);
         $scope.objMapa.setZoom(16);
         $scope.objMapa.setCenter(me);

       }, function(err) {
         alert("We can't find your current location!");
     });

   };

   $rootScope.saveBar = function (bar) {
      // check if localStorage.photos doesn't exist yet
      if (!localStorage.bars) {
        localStorage.bars = JSON.stringify([]);
      }
      console.log(bar);

      // if a bar is already present in local storage, don't save it; if you do save it, an error will be thrown

      // get existing favorites from localStorage.bars
      $rootScope.allBars = JSON.parse(localStorage.bars);

      // allBars.push(bar);

      if (!(_.findWhere($rootScope.allBars, {id: bar.id}))) {
        $rootScope.allBars.push(bar);
        console.log(bar);
        alert(bar.name + " has been added to favorites!");
      } else {
        alert("That bar is already in your favorites!");
      }

      // reset localStorage.photos to updated array of all bars
      localStorage.bars = JSON.stringify($rootScope.allBars);
      console.log(localStorage.bars);

      };

      $scope.drink = function() {
        alert("Let's get a drink!");
      };

   }]);

app.controller('FavoritesCtrl', ['$scope', '$state', function ($scope, $state) {

  if (!localStorage.bars) {
   $scope.favorites = [];
  } else {
    $scope.favorites = JSON.parse(localStorage.bars);
    console.log($scope.favorites);
  }

  // delete a bar
  $scope.deleteBar = function (bar) {
    // get existing favorites from localStorage.bars
    var allBars = JSON.parse(localStorage.bars);

    var foundBar = _.findWhere(allBars, {id: bar.id});

    allBars.splice(allBars.indexOf(foundBar), 1);

    alert("You've removed " + foundBar.name + " from your favorites!");

    // reset localStorage.bars to updated array of all bars
    localStorage.bars = JSON.stringify(allBars);
  };

}]);

app.controller('BarCtrl', ['$scope', '$rootScope', '$stateParams', '$routeParams', 'bars', '$timeout', '$cordovaGeolocation', '$ionicPlatform', '$http', '$cordovaSocialSharing', function($scope, $rootScope, $stateParams, $routeParams, bars, $timeout, $cordovaGeolocation, $ionicPlatform, $http, $cordovaSocialSharing){

  $scope.whichBar = $stateParams.barId;

  $scope.thisBar = _.findWhere($rootScope.bars, {id: $scope.whichBar});

  console.log("place_id for thebar is " + $scope.thisBar.place_id);

  $http.get('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + $scope.thisBar.place_id + '&key=AIzaSyATy7HmpP5HnTkO6mGUuiAJFswORqSgk9w')
    .then(function(response) {
      // return an array of bars
      $scope.specificBar = response.data.result;
    });

  $scope.shareThis = function (message, image, link) {

    console.log(message);
    console.log(image);
    console.log(link);

    $cordovaSocialSharing
      .shareViaFacebook(message, image, link)
      .then(function(result) {
        alert("Shared to Facebook!");
      }, function(err) {
        alert("Oops, something went wrong! Try again, please.");
    });

  };

}]);
