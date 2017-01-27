(function (){
  var app = angular.module('LoginController', ['ngRoute', 'ngAnimate']).config(['$httpProvider', function ($httpProvider) {
      //Reset headers to avoid OPTIONS request (aka preflight)
      $httpProvider.defaults.headers.common = {};
      $httpProvider.defaults.headers.post = {};
      $httpProvider.defaults.headers.get = {};
      $httpProvider.defaults.headers.delete = {};
      $httpProvider.defaults.headers.put = {};
      $httpProvider.defaults.headers.patch = {};
      // $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
      //$httpProvider.defaults.headers.common['Authorization'] = 'Basic ' + btoa(my_id+ ':' + my_pass")
     }]);


  app.controller('LoginController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    $scope.token={}

    $scope.login = function() {
      if ($scope.user.email !== '' && $scope.user.password !== '') {
        $http({
          method: 'POST',
          data: {
            email: $scope.user.email,
            password: $scope.user.password
          },
          url: 'https://taskmanager-backend.gomix.me/:3000/login',
        }).then(function (data) {
          var respond = (data.data);
          console.log(respond)
          if (respond.result === 'success') {
            // console.log(respond.token);
            // console.log(respond);
            localStorage.setItem("token", respond.token);
            console.log(localStorage);
            $location.path('/home');
          }
        }).catch(function (data) {
          console.log('error');
        });
      }
    };
    $scope.signUpView = function () {
      $location.path('/signup');
    };
  }]);
  module.exports = app: app
})();

// LoginController;
