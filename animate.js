// JavaScript Document
$(document).ready(function() {
	/*
	* Global Variables
	*/
	var playAnimation = true;
	var pauseScore = false;
	var direction = 'none';
	var score = 0;
	var enemySpeed = 1000;
	var level = 1;
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
	
	player.push(new Player(135, 450, 30, 30));
	
	/*
	* Spawn new batches of enemies and increase frequency
	*/
	
	function enemySpawn() {
	if(level == 1 || level == 2){
			enemies.push(new Enemies(Math.round(Math.random()*270), 0, 30, 30));
		} else if(level == 3){
			enemies.push(new Enemies(Math.round(Math.random()*270), 0, 30, 30));
			enemies.push(new Enemies(Math.round(Math.random()*270), 0, 30, 30));
	}
	
	if(enemySpeed > 600 && level == 1){
			enemySpeed -= 10;
		} else if(enemySpeed > 300 && level == 2 && velocity > 10){
		enemySpeed -= 5;
	}
	
	if(playAnimation){
		setTimeout(enemySpawn, enemySpeed);
	}
	}
	
	/*
	* Spawn some power ups at random
	*/
	
	var Powerups = function(x, y) {
		this.x = x;
		this.y = y;
	};
	var powerups = new Array();
	
	function powerSpawn() {
		powerups.push(new Powerups(Math.round(Math.random()*270), 0, 30, 30));
		
		if(playAnimation){
		setTimeout(powerSpawn, Math.round(Math.random()*(30000-5000)+5000));
	}
	}
	
	
	
	/*
	* Animate the player movement
	*/
	function animate() {
	
		var playerLength = player.length;
		for (var i = 0; i < playerLength; i++){
			var tmpPlayer = player[i];
				ctx.clearRect(0, 0, 300, 500);
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
				} else {
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
		/*
		* THIS IS THE NEW METHOD I WANT TO USE BUT IT CAUSES FLASHING
		*/
		/*
					for(var i=0; i<enemies.length; i++) {
			if (enemies[i] == tmpEnemies){
				enemies.splice(enemies.indexOf(enemies[i]), 1);
					}
				}
		*/
		};
		
		};
		
				
		/*
		* Animate the power ups
		*/
		var powerupsLength = powerups.length;
		for (var i = 0; i < powerupsLength; i++) {
			var tmpPowerups = powerups[i];
				if( level == 1){
					tmpPowerups.y += 3;
				} else if( level == 2){
					tmpPowerups.y += velocity;
				} else {
					tmpPowerups.y += velocity;
		}
		ctx.fillStyle = "blue";
		ctx.fillRect(tmpPowerups.x, tmpPowerups.y, 30, 30);
		
		/*
		* Check for power up collision
		*/
		if (!(tmpPowerups.x+30 < player[0].x) &&
			!(player[0].x+30 < tmpPowerups.x) &&
			!(tmpPowerups.y+30 < player[0].y) &&
			!(player[0].y+30 < tmpPowerups.y)) { 
			
		for(var i=0; i<powerups.length; i++) {
			if (powerups[i] == tmpPowerups){
				powerups.splice(powerups.indexOf(powerups[i]), 1);
					}
				}
			}
		}
		
		/*
		* Move the player
		*/
		if( direction == 'left'){
			if(player[0].x-8 < 0){
				player[0].x = 0;
			} else {
				player[0].x -= 8;
			}
		} else if( direction == 'right'){
			if(player[0].x+8 > 270){
				player[0].x = 270;
			} else {
				player[0].x += 8;
			}
		}
	
		if(playAnimation){
			setTimeout(animate, 33);
		}
	}
	
		/*
		* Count our score
		*/
		function countScore() {
		score += 1;
		
		if(playAnimation){
			setTimeout(countScore, 500);
		}
	}
	
		/*
		* Change level depending on score
		*/
		function levelCheck(){
				
		if(score < 75){
			level = 1;
		} else if(score < 200){
			level = 2;
		} else if(score < 300){
			level = 3;
		}
		
		if( level == 2 && velocity < 10 ){
			velocity += 0.01;
		}
		
		if(playAnimation){
			setTimeout(levelCheck, 33);
		}
		
		}
		
	/*****************************/
	/*****************************/
	/*****Score Board Section*****/
	/*****************************/
	/*****************************/
	
	/*
	* Draw the board
	*/
	function drawBoard(){
		ctx.fillStyle = "black";
		ctx.beginPath();
		ctx.moveTo(300,0);
		ctx.lineTo(300,500);
		ctx.lineTo(301,500);
		ctx.lineTo(301,0);
		ctx.fill();
		
		ctx.beginPath();
		ctx.moveTo(305, 40);
		ctx.lineTo(445, 40);
		ctx.lineTo(445, 65);
		ctx.lineTo(305, 65);
		ctx.lineTo(305, 40);
		ctx.moveTo(305, 70);
		ctx.lineTo(445, 70);
		ctx.lineTo(445, 95);
		ctx.lineTo(305, 95);
		ctx.lineTo(305, 70);
		ctx.moveTo(305, 100);
		ctx.lineTo(445, 100);
		ctx.lineTo(445, 125);
		ctx.lineTo(305, 125);
		ctx.lineTo(305, 100);
		ctx.closePath();
		ctx.stroke();
		
		ctx.font = 'bold 30px Calibri'
		ctx.textBaseline = 'bottom';
		ctx.fillText("Powerups", 312, 35);
		
		ctx.font = '40px san-serif';
		ctx.textBaseline = 'bottom';
		ctx.fillText("Level:", 325, 400);
		ctx.fillText("Score:", 325, 470);
		}
		
	/*
	* Show the score & Level
	*/
	function showScore(){
		ctx.clearRect(325, 465, 100, 30);
		ctx.font = '25px san-serif';
		ctx.textBaseline = 'bottom';
		if(score < 10){
		ctx.fillStyle = "black";
		ctx.fillText(score, 370, 490);
		} else if(score < 100){
		ctx.fillStyle = "black";
		ctx.fillText(score, 365, 490);
		} else {
		ctx.fillStyle = "black";
		ctx.fillText(score, 360, 490);
		}
		
		var bonusScores = [ 71, 75, 77, 79, 200, 202, 204, 206, 300, 302, 304, 306 ];

		for( i = 0; i < bonusScores.length; i++ ) {
    			if( ( level == 2 || level == 3 ) && ( score == bonusScores[i] ) ) {
       				ctx.clearRect(325, 395, 100, 30);
					ctx.font = 'bold 25px san-serif';
					ctx.fillStyle = "red";
					ctx.fillText(level, 370, 420);
		} else {
					ctx.clearRect(325, 395, 100, 30);
					ctx.fillText(level, 370, 420);
			}
		}
		
		if(playAnimation == true && pauseScore == false){
			setTimeout(showScore, 33);
		}
	}
	/*
	* Actually run all of the animation functions
	*/
	animate();
	enemySpawn();
	countScore();
	levelCheck();
	drawBoard();
	showScore();
	powerSpawn();
});