module.exports = angular.module('HomeController', ['ngRoute', 'ngAnimate']).controller('HomeController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

  $scope.checkToken = function ($routeProvider){
    if (localStorage.length === 0) {
      $location.path('/login');
    };
  };

  $scope.checkToken();

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
      }).catch(function (data) {
        console.log('error');
      })
    }
  }

  $scope.listTasks()

  $scope.setOrder = function(order){
    // console.log(order);
    if (order =='time') {
      $scope.order = 'time';
    } else if (order == 'prioritiy'){
      $scope.order = 'priority';
    } else if (order == 'type'){
      $scope.order = 'type';
    }
  }

  $scope.addTask = function() {
    console.log($scope.date.getHours())
    console.log($scope.date.getMinutes())
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
    if($scope.visible == "active"){
      $scope.visible = "hidden";
    } else {
      $scope.visible = "active";
    }
  }

  $scope.menus = [
    {
      title: 'Time',
      activated: 'active',
      param: 'time'
    },
    {
      title: 'Priority',
      activated: '',
      param: 'priority'
    },
    {
      title: 'Category',
      activated: '',
      param: 'type'
    }
  ]

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

  $scope.checkTask = function(id, checked){
    var check = 0;
    if (checked === 0){
      check = 1;
    }
    $http({
      method: 'POST',
      data: {
        id: id,
        checked: check
      },
      url: 'https://taskmanager-backend.gomix.me/checktask',
    }).then(function (data) {
      $scope.listTasks();
    }).catch(function (data) {
      console.log('error');
    })
  }

}]);

//module.exports = HomeController;
