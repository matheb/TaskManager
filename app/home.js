module.exports = angular.module('HomeController', ['ngRoute', 'ngAnimate']).controller('HomeController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

  $scope.checkToken = function ($routeProvider){
    if (localStorage.length === 0) {
      $location.path('/login');
    };
  };

  // $scope.checkToken();

  $scope.logout = function(){
    localStorage.clear();
    $location.path( "/login" );
  }

  $scope.listTasks = function() {
    if (localStorage.token !== '') {
      $http({
        method: 'POST',
        data: {
          token: localStorage.token
        },
        url: 'https://taskmanager-backend.gomix.me/tasks',
      }).then(function (data) {
        $scope.tasks = data.data;
        console.log($scope.tasks);
      }).catch(function (data) {
        console.log('error');
      })
    }
  }

  $scope.listTasks()

  $scope.addTask = function() {
    if (localStorage.token !== '') {
      $http({
        method: 'POST',
        data: {
          token: localStorage.token
        },
        url: 'https://taskmanager-backend.gomix.me/tasks',
      }).then(function (data) {
        $scope.tasks = data.data;
        console.log($scope.tasks);
      }).catch(function (data) {
        console.log('error');
      })
    }
  }




  $scope.makevisible = function(){
    if($scope.visible == "visible"){
      $scope.visible = "hidden";
    } else {
      $scope.visible = "visible";
    }
  }

  $scope.clickitem = function($index){
    $scope.subscriptions.map( function ( folder ) {
      folder.active = false;
    });
    $scope.subscriptions[ $index ].active = true;
  }

  $scope.getSubscription = function () {
    console.log(localStorage)
    $http({
      method: 'GET',
      url: 'http://localhost:3000/subscription',
    }).then(function (data) {
      $scope.subscriptions = data.data;

    }).catch(function (data) {
      console.log('error');
    });
  };

  $scope.getFeed = function () {
    $http({
      method: 'GET',
      url: 'http://localhost:3000/feed/43673',
    }).then(function (data) {
      $scope.articles = (data.data);

    }).catch(function (data) {
      console.log('error');
    });
  };

  $scope.getSubscription();
  $scope.getFeed();

}]);

//module.exports = HomeController;
