var fs = require('fs');

// Define application module.
angular.module('3votApp', [ 'ngRoute' ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        name       : 'main',
        controller : 'MainCtrl',
        template   : fs.readFileSync(__dirname + '/../templates/main.html')
      })
      .when('/how', {
        name     : 'how',
        template : fs.readFileSync(__dirname + '/../templates/how.html')
      })
      .otherwise({
        redirectTo : '/main'
      });
  })
  .run(function ($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (e, current) {
      $rootScope.currentRoute = current.$$route && current.$$route.name;
    });
  });