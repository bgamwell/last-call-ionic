app.factory('bars', ['$http', function($http) {
 return $http.get('assets/bars.json')
 // console.log('hello!');
 .success(function(data) {
   console.log('json data received');
   console.log(data[0]);
   // $scope.teams = data;
    return data;
  })
  .error(function(err) {
    return err;
  });

}]);
