activeUser = null;

angular.module('userApp', ['ngRoute', 'ngDialog', 'angularFileUpload'])
.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/app/views/pages/home.html'
      })
      .when('/home', {
        templateUrl: '/app/views/pages/home.html'
      })
      .when('/vendors', {
        templateUrl: '/app/views/pages/vendors.html'
      })
      .when('/schedule', {
        templateUrl: '/app/views/pages/schedule.html'
      })
      .when('/account/:user_id?', {
        templateUrl: '/app/views/pages/account.html'
      })
      .when('/settings', {
        templateUrl: '/app/views/pages/settings.html'
      })
      .when('/contact', {
        templateUrl: '/app/views/pages/contact.html'
      })
      .when('/login', {
        templateUrl: '/app/views/pages/login.html'
      })
      .when('/signup', {
        templateUrl: '/app/views/pages/signup.html'
      })
      .when('/admin', {
        templateUrl: '/app/views/pages/admin.html'
      })
      .when('/forgot', {
        templateUrl: '/app/views/pages/forgot.html'
      })
      .when('/reset/:token_id?', {
        templateUrl: '/app/views/pages/reset.html'
      })
    $locationProvider.html5Mode(true);
}])
.filter('trustUrl', function ($sce) {
  return function(url) {
    return $sce.trustAsResourceUrl(url);
  };
});
