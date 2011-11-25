// JavaScript Document
$(document).ready(function() {
	/*
	* Global Variables
	*/
	var playAnimation = true;
	var direction = 'none';
	var score = 0;
	var enemySpeed = 1000;
	var level = 0;
	var velocity = 3;
	
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
	* Spawn new batches of enemies and increase frequency
	*/
	
	function enemySpawn() {
	enemies.push(new Enemies(Math.round(Math.random()*300), 0, 30, 30));
	if(enemySpeed > 600 && level == 1){
	enemySpeed -= 10;
	console.log(enemySpeed)
	} else if(enemySpeed > 300 && level == 2 && velocity > 10){
	enemySpeed -= 5;
	console.log(enemySpeed)
	}
	
	if(playAnimation){
	setTimeout(enemySpawn, enemySpeed);
	}
	}

	
	/*
	* Animate the player movement
	*/
	function animate() {
	
		var playerLength = player.length;
		for (var i = 0; i < playerLength; i++){
		var tmpPlayer = player[i];
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		ctx.fillStyle = "red";
		ctx.fillRect(tmpPlayer.x, tmpPlayer.y, 30, 30);
		};
		
		/*
		* Animate the enemies
		*/
		
		var enemiesLength = enemies.length;
		for (var i = 0; i < enemiesLength; i++) {
		var tmpEnemies = enemies[i];
		if( level == 1){
		tmpEnemies.y += 3;
		} else if( level == 2){
		tmpEnemies.y += velocity;
		}
		ctx.fillStyle = "black";
		ctx.fillRect(tmpEnemies.x, tmpEnemies.y, 30, 30);
		
		/*
		* look for collisions
		*/
		if (!(tmpEnemies.x+30 < player[0].x) &&
		!(player[0].x+30 < tmpEnemies.x) &&
		!(tmpEnemies.y+30 < player[0].y) &&
		!(player[0].y+30 < tmpEnemies.y)) { 
		playAnimation = false;
		};
		
		/*
		* Clears the rectangle once it has left the screen
		*/
		if (tmpEnemies.y > 500){
		ctx.clearRect(tmpEnemies.x, tmpEnemies.y, 30, 30)
		};
		
		};
		
		/*
		* Move the player
		*/
		if( direction == 'left'){
			if(player[0].x < 5){
			player[0].x == 5;
			} else {
			player[0].x -= 8;
			}
		} else if( direction == 'right'){
			if(player[0].x > 270){
			player[0].x == 270;
			} else {
			player[0].x += 8;
			}
		}

		/*
		* Show the score
		*/
		ctx.font = '20px san-serif';
		ctx.textBaseline = 'bottom';
		ctx.fillText(score, 270, 485);
		
		if(playAnimation){
		setTimeout(animate, 33);
		}
	}
	
		function countScore() {
	
		/*
		* Count our score and change level if needed
		*/
		score += 1;
		
		if(playAnimation){
		setTimeout(countScore, 500);
		}
	}
	
		function levelCheck(){
				
		if(score < 75){
		level = 1;
		} else if(score < 130){
		level = 2;
		}
		
		if( level == 2 && velocity < 10 ){
		velocity += 0.01;
		}
		
		if(playAnimation){
		setTimeout(levelCheck, 33);
		}
		
		}
	
	/*
	* Actually run all of the animation functions
	*/
	animate();
	enemySpawn();
	countScore();
	levelCheck();
});