module.exports = angular.module('SignUpController', ['ngRoute', 'ngAnimate']).controller('SignUpController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

  $scope.signUp = function() {
    if ($scope.user.email !== '' && $scope.user.password !== '') {
      $http({
        method: 'POST',
        data: {
          email: $scope.user.email,
          password: $scope.user.password,
        },
        url: 'https://taskmanager-backend.gomix.me/registration',
      }).then(function (data) {
        var respond = data.data;
        //console.log(respond);
        // let respond = (data.data);
        if (respond !== '') {
          localStorage.setItem("token", respond);
          $location.path('/home');
        } else {
          alert('error');
        }
      }).catch(function (data) {
        console.log('error');
      })
    }
  }
  
}]);
