$(function(){
	
	

$('canvas').drawLine({
  strokeStyle: '#000',
  strokeWidth: 1,
  x1: 0, y1: 0,
  x2: 500, y2: 0,
  x3: 500, y3: 500,
  x4: 0, y4: 500,
  x5: 0, y5: 0
});	

// Round number to nearest multiple of n
function nearest(number, n) {
  return Math.round(number / n) * n;
}
 
// Width/height of each grid square
var gridSize = 20;
 
// Draw draggable square
$("canvas").drawRect({
  layer: true,
  draggable: true,
  fillStyle: "#c33",
  x: 100, y: 100,
  width: 100, height: 20,
  // Snap square to grid
  drag: function(layer) {
  
  	if(layer.x < 40) {
  		//alert('hey dont do that');
	  	layer.x = layer.x + 10;
	  	
  	}

    layer.x = nearest(layer.x, gridSize);
    layer.y = nearest(layer.y, gridSize);

  	console.log(layer.x + ' ' + layer.y);

  }
});
	
});