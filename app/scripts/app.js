'use strict';

/**
 * @ngdoc overview
 * @name bangularApp
 * @description
 * # bangularApp
 *
 * Main module of the application.
 */
angular
  .module('bangularApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/start', {
        templateUrl: 'views/startgame.html',
        controller: 'GameBoardController'
      })
      .when('/placeships', {
        templateUrl: 'views/placeships.html',
        controller: 'GameBoardController'
      })
      .when('/dropbombs', {
        templateUrl: 'views/dropbombs.html',
        controller: 'GameBoardController'
      })
      .otherwise({
        redirectTo: '/start'
      });
  });
