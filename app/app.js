require('./lib/angular.min.js');
require('./lib/angular-route.min.js');
require('./lib/angular-animate.min.js');

var LoginController = require('./login.js');
var HomeController = require('./signup.js');
var SignUpController = require('./home.js');

require('../node_modules/semantic-ui/dist/semantic.min.css');
require('../node_modules/semantic-ui/dist/components/accordion.css');
require('../node_modules/semantic-ui/dist/components/popup.css');
require('../node_modules/semantic-ui/dist/components/modal.css');

require('../css/login.scss');
require('../css/todo.scss');


var taskManager = angular.module('taskManager', ['ngRoute', 'ngAnimate', 'LoginController', 'HomeController', 'SignUpController']);

taskManager.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController',
    })
    .when('/signup', {
      templateUrl: 'views/registration.html',
      controller: 'SignUpController',
    })
    .when('/home', {
      templateUrl: 'views/todo.html',
      controller: 'HomeController',
    })
    .otherwise({
      redirectTo: '/login',
    });
}]);
