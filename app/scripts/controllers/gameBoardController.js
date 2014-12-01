'use strict';

/**
 * @ngdoc function
 * @name bangularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bangularApp
 */
angular.module('bangularApp')
  .controller('GameBoardController', function ($scope, $routeParams, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.message = 'this is a test';
    
    //Arrays that will be used for initial ship placement
    $scope.carrier_h_tiles = [];
    $scope.carrier_v_tiles = [];        
    $scope.battleship_h_tiles = [];
    $scope.battleship_v_tiles = [];  
    $scope.sub_h_tiles = [];
    $scope.sub_v_tiles = [];
    $scope.destroyer_h_tiles = [];
    $scope.destroyer_v_tiles = [];    
    $scope.patrol_h_tiles = [];
    $scope.patrol_v_tiles = [];                    
      
    //Sub - 4
    //Destroyer - 3
    //Patrol Boat - 
    $scope.shipslots = {'carrier':5,'battleship':4,'sub':4,'destroyer':3,'patrol':2};
    
    $scope.columns = ['A','B','C','D','E','F','G','H','I','J'];
    $scope.rows = [1,2,3,4,5,6,7,8,9,10];
    
    $scope.placevertical = true;
    
    $scope.gamegrid = [];
    $scope.ships = [];
    
    $scope.activeplayer = 'P1';
    $scope.activeship = false;
    
    $scope.init = function(){
	    
	    $.each($scope.columns,function(ci,cv){
		   
		   $.each($scope.rows,function(ri,rv){
			  
			  var tileid = cv + '' + rv;
			  var tilecoords = cv + ',' + rv;	  			 
			 			  			  			  			  	  			  
			  var carrierok = false;
			  var carrierok_v = false;
			  var battleshipok = false;
			  var battleshipok_v = false;			  
			  var subok = false;
			  var subok_v = false;			  
			  var destroyerok = false;
			  var destroyerok_v = false;
			  var patrolok = false;
			  var patrolok_v = false;
			  
			  var xindex = $scope.rows.indexOf(rv);
			  var yindex = $scope.columns.indexOf(cv);
			  
			  //Carrier
			  if(xindex < 6 ){ carrierok = true; $scope.carrier_h_tiles.push(tilecoords); }
			  if(yindex < 6){ carrierok_v = true; $scope.carrier_v_tiles.push(tilecoords);}			  
			  

			  //Battleship & Sub
			  if(xindex < 7){ subok = true; }
			  			  
			  
			  var gridtile = {
			  	  'coords' : tilecoords,
				  'carrier_h': carrierok,
				  'carrier_v': carrierok_v,
				  'battleship_h': battleshipok,
				  'battleship_v': battleshipok_v,
				  'sub_h': subok,
				  'sub_v': subok_v,				  				  				  				  				  
				  'destroyer_h': destroyerok,
				  'destroyer_v': destroyerok_v,
				  'patrol_h': patrolok,
				  'patrol_v': patrolok_v,				  				  
				  
				  
			  }
			  
			  var tile = { 'tileid' : tileid , 'data' : gridtile };
			  			  
			  //$scope.gamegrid[tileid] = gridtile;
			  $scope.gamegrid.push(gridtile);
			  
			   
			   
		   }); //end rows 
		    
	    }); //end columns
	  
	  //console.log($scope.gamegrid);  
	    
    } 
    
    //$scope.init();
    
    $scope.paintboard = function(scope){
	    
	    
	    $.each($scope.gamegrid,function(key,val){
		   
		   
		   if(val.carrier_v == true){
			   
			   $('div[coords="' + val.coords + '"]').css('background-color','green');
			   
		   } 
		    
	    });
	    
	    
    }

	$scope.getshiptiles = function(type,tile,vertical){
		
		console.log('Num tiles for ' + type + ': ' + $scope.shipslots[type]);
		
	}

    $scope.startgame = function(){ $location.url('/placeships'); }
    
    $scope.addshiptoboard = function(type,start,vertical){
	   
	    var targettile = $('div[coords="' + start + '"]'); 
	    var targetOffset = $(targettile).offset();
	    
	    var shipSelector = 'ship_' + $scope.ships.length;
	    
	    //Remove any existing ships matching the ID from the board
		$('#' + shipSelector).remove();
	    
	    var orientation = '';
	    if(vertical) orientation = '_v';
	    else orientation = '_h';	    
	    
	    var imgsrc = type + orientation + '.png';
	    
		var shipcode = '<div class="shipClickable ' + type + orientation + '" id="' + shipSelector + '" />';	    
	    $('.boardContainer').append(shipcode);
	    
	    $('#'+shipSelector).click(function(event){
	    
	    	alert('test');
	    
	    });
	    
	    $('#' + shipSelector).css('top',Math.floor(targetOffset.top));
	    $('#' + shipSelector).css('left',Math.floor(targetOffset.left));
	    	    
	    
    }
    
    $scope.placenewship = function(shiptype){	    
	    
		//Aircraft Carier
	    if(shiptype == 'carrier'){
		    
			console.log('placing aircraft carrier');
			var startpoint = $scope.getrandomtile(true);

			

			$scope.addshiptoboard(shiptype,startpoint,$scope.placevertical);
			
			
			    
	    }
	    
	    
	    
    }
   
    
    //Argument EMPTY specifies whether or not to retrieve an empty tile or not... helpful for possible AI
    $scope.getrandomtile = function(type,empty){
	    
	    var tiles = [];
	    
	    if(type = 'carrier'){
		    
		    if($scope.placevertical){ tiles = $scope.carrier_v_tiles; } 
		    else { tiles = $scope.carrier_h_tiles; }
	    
	    }
	    
	    
	    //var random = items[Math.floor(Math.random()*items.length)]
	    
	    var tile = tiles[Math.floor(Math.random()*tiles.length)];
	    
	    //console.log('randtile: ' + tile);
	    
	    //var randx = Math.floor(Math.random() * 10);
	    //var randy = Math.floor(Math.random() * 10);
	    //var tilex = $scope.columns[randx];
	    //var tiley = $scope.rows[randy];
		
	    
	    //If we want an empty tile
	    if(empty){ 
	    
	    	return tile;
		    
	    } else {
		//Else if an occupied tile is ok    
		 
			 return tile;
		    
	    }
	    
    }
   
    $scope.hovertile = function($event){
	    
	    //console.log('Hover Enter');
	    //console.log($event);
	    
	    //$(event.target).css('background-color','#FF0000');
	    
    }
    
    $scope.exittile = function($event){

	    //$(event.target).css('background-color','#00FF00');	    
	    
    }
    
    $scope.clicktile = function($event){
	    
	    
	    
	    
    }
    
    $scope.unclicktile = function($event){
	    
	    
	    
    }
    
    $scope.toggleshipalignment = function(){
	    
	    $('.btnShipAlign').toggleClass('btn-primary');
	    $scope.placevertical = !$scope.placevertical;	    
    }
        
    
  });
