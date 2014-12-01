'use strict';

/**
 * @ngdoc function
 * @name bangularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bangularApp
 */
angular.module('bangularApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

$(document).ready(function(){

	$('.jumbotron').on("click",'.shipClickable',function(event){
		
		
		alert('ship clicked!');
		
	});

});