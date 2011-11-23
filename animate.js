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
	Define where the player is by default
	*/
	var x = 0;
	var y = 450;
	
	/*
	Create a template for enemies
	*/
	var Enemies = function(x, y) {
	this.x = x;
	this.y = y;
	};
	
	/*
	Group the enemies
	*/
	var enemies = new Array();
	
	/*
	Spawn a new batch of enemies every 3 seconds
	*/
	
	function enemySpawn() {
	enemies.push(new Enemies(Math.random()*300, 0, 30, 30));
	enemies.push(new Enemies(Math.random()*300, 0, 30, 30));
	enemies.push(new Enemies(Math.random()*300, 0, 30, 30));
	enemies.push(new Enemies(Math.random()*300, 0, 30, 30));
	enemies.push(new Enemies(Math.random()*300, 0, 30, 30));
	
	setTimeout(enemySpawn, 3000);
	}

	
	/*
	Animate the player movement
	*/
	function animate() {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		
		ctx.fillStyle = "rgb(0, 0, 0)";
		ctx.fillRect(x, y, 30, 30);
		

		
		setTimeout(animate, 33);
	}
	
	/*
	Animate the enemies
	*/
	
	function enemyAnimate() {
	
				var enemiesLength = enemies.length;
				for (var i = 0; i < enemiesLength; i++) {
				var tmpEnemies = enemies[i];
				tmpEnemies.y++;
				ctx.fillRect(tmpEnemies.x, tmpEnemies.y, 30, 30);
				};
				
			setTimeout(enemyAnimate, 33);
	}
	
	/*
	Actually run all of the animation functions
	*/
	animate();
	enemyAnimate();
	enemySpawn();
});