// JavaScript Document
$(document).ready(function() {
	/*
	* Define The Canvas Element
	*/
	var canvas = $("#canvas");
	
	/*
	* Create the 2D drawing space
	*/
	var ctx = canvas.get(0).getContext("2d");
	
	/*
	* Define a variable for the canvas
	* width and height. This will help
	* us clear more effectively
	*/
	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();
	
	/*
	* Define keys and the default direction
	* W&D
	*/
    var keys = [ [ 37, 65 ], [ 39, 68 ] ];
    var direction = 'none';
    
    /*
    * Check if we have pressed a key or released it
    */
    document.onkeydown = keyPress;
	document.onkeyup = keyRelease;
	
	/*
	* Check which key is pressed and define the player direction
	*/
	function keyPress(evt){
		if( evt.which == keys[0][0] || evt.which == keys[0][1] ) {
		direction = 'left';
		return direction;
	}else if( evt.which == keys[1][0] || evt.which == keys[1][1] ) {
		direction = 'right';
		return direction;
		}
	}
	
	/*
	* Check if a key is released and set no direction
	*/
	
	function keyRelease(evt){
		if( evt.which == keys[0][0] || evt.which == keys[0][1] ) {
		direction = 'none';
		return direction;
	}else if( evt.which == keys[1][0] || evt.which == keys[1][1] ) {
		direction = 'none';
		return direction;
		}
	}
	
	/*
	* Create a template for enemies
	*/
	var Enemies = function(x, y) {
	this.x = x;
	this.y = y;
	};
	
	/*
	* Group the enemies
	*/
	var enemies = new Array();
	
	/*
	* Create a player
	*/
	var Player = function(x ,y) {
	this.x = x;
	this.y = y;
	};
	
	var player = new Array();
	
	player.push(new Player(0, 450, 30, 30));
	
	
	/*
	* Spawn a new batch of enemies every 3 seconds
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
	* Animate the player movement
	*/
	function animate() {
	
		var playerLength = player.length;
		for (var i = 0; i < playerLength; i++){
		var tmpPlayer = player[i];
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		ctx.fillStyle = "rgb(0, 0, 0)";
		ctx.fillRect(tmpPlayer.x, tmpPlayer.y, 30, 30);
		};
		
		/*
		* Animate the enemies
		*/
		
		var enemiesLength = enemies.length;
		for (var i = 0; i < enemiesLength; i++) {
		var tmpEnemies = enemies[i];
		tmpEnemies.y += 3;
		ctx.fillRect(tmpEnemies.x, tmpEnemies.y, 30, 30);
		};
		
		/*
		* Move the player
		*/
		if( direction == 'left'){
		player[0].x -= 8;
		} else if( direction == 'right'){
		player[0].x += 8;
		}
		
		setTimeout(animate, 33);
	}
	
	/*
	* Actually run all of the animation functions
	*/
	animate();
	enemySpawn();
});