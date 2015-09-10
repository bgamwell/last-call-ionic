app.factory('bars', ['$http', function($http) {
 return $http.get('assets/bars.json')
 // console.log('hello!');
 .success(function(data) {
    return data;
  })
  .error(function(err) {
    return err;
  });

}]);
