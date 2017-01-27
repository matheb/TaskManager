  module.exports = angular.module('LoginController', ['ngRoute', 'ngAnimate']).controller('LoginController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

  $scope.token={};

  $scope.login = function() {
    if ($scope.user.email !== '' && $scope.user.password !== '') {
      $http({
        method: 'POST',
        data: {
          email: $scope.user.email,
          password: $scope.user.password,
        },
        url: 'https://taskmanager-backend.gomix.me/login',
      }).then(function (data) {
        var respond = data.data;
        if (respond !== '') {

          console.log(respond);
          localStorage.setItem("token", respond);
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
