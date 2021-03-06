module.exports = angular.module('HomeController', ['ngRoute', 'ngAnimate']).controller('HomeController', ['$scope', '$http', '$location', '$interval', function ($scope, $http, $location, $interval) {

  $scope.times = [];
  $scope.activated = '';

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
        url: 'https://taskmanager-backend.glitch.me/tasks',
      }).then(function (data) {
        $scope.tasks = data.data;
        $scope.icon = $scope.setIcon(type);
        console.log('tasks: ' + $scope.tasks);
      }).catch(function (data) {
        console.log('error');
      })
    }
  }

  $scope.listTasks()

  $scope.setOrder = function(order){
    // console.log(order);
    if (order =='time') {
      $scope.order = 'date';
    } else if (order == 'priority'){
      $scope.order = 'priority';
    } else if (order == 'type'){
      $scope.order = 'type';
    }
    else if (order == 'checked'){
      $scope.order = 'checked';
    }
  }


  $scope.addTask = function() {
    console.log($scope.date.getHours())
    console.log($scope.date.getMinutes())
    console.log($scope.priority);
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
        url: 'https://taskmanager-backend.glitch.me/addtask',
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
        console.log('tasks: ' + data.data );
      }).catch(function (data) {
        console.log('error');
      })
    }
  }

  $scope.timeList = function(time){
    $scope.times.push(time);
    console.log($scope.times)

    $interval($scope.compare, 1000);
  }

  $scope.compare = function(){
    $scope.times.forEach(function(element){
      //console.log('interval')
      var element = new Date(element)
      var now = new Date();
      // console.log(element);
      // console.log(now);
      if (element.getHours() == now.getHours() && element.getMinutes() == now.getMinutes() && element.getSeconds() == now.getSeconds()){
        $scope.activated = 'visible';
        var audio = new Audio('Wake-up-sounds.mp3');
        audio.play();
      }
    })
  }

  // $scope.colorize = function(priority){
  //   if (priority === 1){
  //     $scope.color = 'red';
  //   } else if (priority === 2) {
  //     $scope.color = 'orange';
  //   } else if (priority === 3) {
  //     $scope.color = 'yellow';
  //   } else if (priority === 4) {
  //     $scope.color = 'white';
  //   } else {
  //     $scope.color = 'lightgrey';
  //   }
  // }

  $scope.makevisible = function(){
    if($scope.visible == "active"){
      $scope.visible = "hidden";
    } else {
      $scope.visible = "active";
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
      url: 'https://taskmanager-backend.glitch.me/deletetask',
    }).then(function (data) {
      $scope.listTasks();
    }).catch(function (data) {
      console.log('error');
    })
  }


  $scope.makeinactive = function(){
    $scope.activated = '';
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
      url: 'https://taskmanager-backend.glitch.me/checktask',
    }).then(function (data) {
      $scope.listTasks();
    }).catch(function (data) {
      console.log('error');
    })
  }


}]);

// module.exports = HomeController;
