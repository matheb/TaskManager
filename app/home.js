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
          token: localStorage.token,
          task_name: $scope.task_name,
          type: $scope.type,
          date: $scope.date,
          description: $scope.description,
          priority: $scope.priority,
          reminder: $scope.checked,
          checked: $scope.checked
        },
        url: 'https://taskmanager-backend.gomix.me/addtask',
      }).then(function (data) {
        $scope.listTasks();
        localStorage.token = '';
        $scope.task_name = '';
        $scope.type = '';
        $scope.date = '';
        $scope.description = '';
        $scope.priority = '';
        $scope.checked = '';
        $scope.checked = '';
        // $scope.tasks = data.data;
        // console.log($scope.tasks);
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

  $scope.deleteTask = function(id){
    console.log(id)
    $http({
      method: 'POST',
      data: {
        id: id
      },
      url: 'https://taskmanager-backend.gomix.me/deletetask',
    }).then(function (data) {
      $scope.listTasks();
    }).catch(function (data) {
      console.log('error');
    })
  }


}]);

//module.exports = HomeController;
