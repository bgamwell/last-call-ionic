angular.module('starter.controllers', ['ngMap', 'ionic', 'ngCordova'])

.controller("ExampleController", function($scope) {

    $scope.savePerson = function(firstname, lastname) {
        var PeopleObject = Parse.Object.extend("PeopleObject");
        var person = new PeopleObject();
        person.set("firstname", firstname);
        person.set("lastname", lastname);
        person.save(null, {});
    };

    $scope.getPeople = function(params) {
    var PeopleObject = Parse.Object.extend("PeopleObject");
    var query = new Parse.Query(PeopleObject);
    if(params !== undefined) {
        if(params.lastname !== undefined) {
            query.equalTo("lastname", params.lastname);
        }
        if(params.firstname !== undefined) {
            query.equalTo("firstname", params.lastname);
        }
    }
    query.find({
        success: function(results) {
            alert("Successfully retrieved " + results.length + " people!");
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                console.log(object.id + ' - ' + object.get("firstname") + " " + object.get("lastname"));
            }
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
};

})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

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
})

.controller('MapCtrl', ['$scope', '$stateParams', '$http', '$timeout', '$cordovaGeolocation', '$ionicPlatform', function($scope, $stateParams, $http, $timeout, $cordovaGeolocation, $ionicPlatform) {

  // customize bar pin style on view
  $scope.image = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    size: [20, 32],
    origin: [0,0],
    anchor: [0, 32]
  };

  $scope.$on('mapInitialized', function (event, map) {
            $scope.objMapa = map;
         });

// $http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.7577,-122.4376&radius=30000&types=bar&keyword=gay&key=AIzaSyATy7HmpP5HnTkO6mGUuiAJFswORqSgk9w')
  // .then(function(response) {
    // $scope.bars = response;
  // });

  $scope.bars = [
    {'id': 1, name: 'Powerhouse', lat: 37.7730761, lng: -122.4121004, description: ''},
    {'id': 2, name: 'Castro Theatre', lat: 37.7620377, lng: -122.4346968, description: ''},
    {'id': 3, name: 'Badlands', lat: 37.7607011, lng: -122.4354564, description: ''},
    {'id': 4, name: '440 Castro', lat: 37.7618428, lng: -122.4353514, description: ''},
    {'id': 5, name: 'The Cafe', lat: 37.7627891, lng: -122.4343241, description: ''},
    {'id': 6, name: 'Q Bar', lat: 37.7616213, lng: -122.4352878, description: ''},
    {'id': 7, name: 'Moby Dick', lat: 37.7608172, lng: -122.4336979, description: ''},
    {'id': 8, name: 'The Edge', lat: 37.7608172, lng: -122.4336979, description: ''},
    {'id': 9, name: 'Midnight Sun', lat: 37.7607688, lng: -122.482758, description: ''},
    {'id': 10, name: 'Lookout', lat: 37.764383, lng: -122.4334021, description: ''},
    {'id': 11, name: 'Lone Star Saloon', lat: 37.7721444, lng: -122.4108652, description: ''},
    {'id': 12, name: 'The Mix', lat: 37.7610948, lng: -122.4345455, description: ''},
    {'id': 13, name: 'Toad Hall', lat: 37.7609714, lng: -122.4357522, description: ''},
    {'id': 14, name: 'Twin Peaks Tavern', lat: 37.7623731, lng: -122.4349194, description: ''},
    {'id': 15, name: 'El Rio', lat: 37.7467935, lng: -122.4194204, description: ''},
    {'id': 16, name: 'Pilsner Inn', lat: 37.7671169, lng: -122.4287035, description: ''},
    {'id': 17, name: 'The Stud', lat: 37.7728278, lng: -122.410002, description: ''},
    {'id': 18, name: 'SF Eagle', lat: 37.7700044, lng: -122.4133666, description: ''},
    {'id': 19, name: 'Hole in the Wall Saloon', lat: 37.7729582, lng: -122.4123879, description: ''},
    {'id': 20, name: 'Underground SF', lat: 37.7724118, lng: -122.4293812, description: ''},
    // {'id': 21, name: "Aunt Charlie's Lounge", lat: 37.7829004, lng: -122.4113768, description: ''},
    {'id': 22, name: 'The Cinch Saloon', lat: 37.7927352, lng: -122.4215355, description: ''},
    {'id': 23, name: 'Hi Tops', lat: 37.7649285, lng: -122.4317197, description: ''},
    {'id': 24, name: 'Trax', lat: 37.7700047, lng: -122.4460374, description: ''},
    {'id': 25, name: 'Beaux', lat: 37.7700047, lng: -122.4460374, description: ''},
    {'id': 26, name: 'BeatBox', lat: 37.7714872, lng: -122.413929, description: ''},
    {'id': 27, name: 'Last Call', lat: 37.7714872, lng: -122.413929, description: ''},
    {'id': 28, name: 'Gangway', lat: 37.7858289, lng: -122.4183209, description: ''},
    {'id': 29, name: 'OMG!', lat: 37.7858289, lng: -122.4183209, description: ''},
    {'id': 30, name: 'Oasis', lat: 37.7746696, lng: -122.4166472, description: ''}
  ];

  $scope.show = function (event, bar) {
            var infowindow = new google.maps.InfoWindow();
            var center = new google.maps.LatLng(bar.lat, bar.lng);

            infowindow.setContent(
                '<p>' + bar.name + '</p>' +
                '<p>' + bar.description + '</p>'
            );

            infowindow.setPosition(center);
            infowindow.open($scope.objMapa);
            $scope.objMapa.setZoom(16);
            $scope.objMapa.setCenter(center);
         };

   // button to zoom to Castro
   var castro = new google.maps.LatLng(37.765909, -122.430985);
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

   $scope.me = function() {
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
             '<p>' + " Bitch, we found you (again) " + '</p>'
         );

         infowindow.setPosition(me);
         infowindow.open($scope.objMapa);
         $scope.objMapa.setZoom(16);
         $scope.objMapa.setCenter(me);

       }, function(err) {
         alert("We can't find your current location!");
     });

   };


}]);
