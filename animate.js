// JavaScript Document
$(document).ready(function() {
	/*
	Define The Canvas Element
	*/
	var canvas = $("#canvas");
	
	/*
	Create the 2D drawing space
	*/
	var ctx = canvas.get(0).getContext("2d");
	
	/*
	Define a variable for the canvas
	width and height. This will help
	us clear more effectively
	*/
	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();
	
	/*
	Define keys
	WASD
	*/
    var keys = [ [ 37, 65 ], [ 39, 68 ] ];
    
    /*
    Check if we have pressed a key
    */
    window.addEventListener('keydown',keyPress,true);
	
	/*
	Work out which key we pressed and move the box in the right direction
	*/
	function keyPress(evt){
		if( evt.which == keys[0][0] || evt.which == keys[0][1] ) {
		x = x - 10;
	}else if( evt.which == keys[1][0] || evt.which == keys[1][1] ) {
		x = x + 10;
		}
	}
	
	/*
	Define where the square is by default
	*/
	var x = 0;
	var y = 450;
	
	/*
	Perform the animation
	*/
	function animate() {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		
		ctx.fillStyle = "rgb(0, 0, 0)";
		ctx.fillRect(x, y, 50, 50);
		
		setTimeout(animate, 33);
	}
	
	animate();
});