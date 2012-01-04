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
	var powerup1 = false;
	var powerup2 = true;
	var powerup3 = false;
	var selectedPowerup = 1;
	var P1Anim = false;
	var P2Anim = false;
	var P3Anim = false;
	var shieldLives = 0;
	
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
	* Define arrays for powerups
	*/
	var Wipeout = function(x, y) {
		this.x = x;
		this.y = y;
	};
		
		var wipeout = new Array();
		
		var Bullet = function(x, y) {
		this.x = x;
		this.y = y;
	};
		
		var bullet = new Array();
		
		var Shield = function(x, y, radius) {
		this.x = x;
		this.y = y;
		this.radius = radius;
	};
		
		var shield = new Array();
		
	/*
	* Define keys and the default direction
	* A&D&W&S and Space bar
	*/
    var keys = [ [ 37, 65 ], [ 39, 68 ], [ 87, 38 ], [ 40, 83 ], [ 32 ] ];
    
    /*
    * Check if we have pressed a key or released it
    */
    document.onkeydown = keyPress;
	document.onkeyup = keyRelease;
	
	/*
	* Check which key is pressed and define the player direction as well as monitoring for firing power ups
	*/
	function keyPress(evt){
		if( evt.which == keys[0][0] || evt.which == keys[0][1] ) {
		direction = 'left';
		return direction;
	}else if( evt.which == keys[1][0] || evt.which == keys[1][1] ) {
		direction = 'right';
		return direction;
	}else if( evt.which == keys[2][0] || evt.which == keys[2][1] ) {
		if(selectedPowerup == 1){
			}else{
		selectedPowerup -= 1;
			}
		return selectedPowerup;
	}else if( evt.which == keys[3][0] || evt.which == keys[3][1] ) {
		if(selectedPowerup == 3){
			}else{
		selectedPowerup += 1;
			}
		return selectedPowerup;
	}else if( evt.which == keys[4]) {
		if(powerup1 == true && selectedPowerup == 1)
		{
		powerup1 = false;
		bullet.push(new Bullet(player[0].x+15, player[0].y, 3, 5));
		if(P1Anim == false){
		startBullet();
		P1Anim = true;
		}
		} else if(powerup2 == true && selectedPowerup == 2)
		{
		powerup2 = false;
		shieldLives += 3;
		if(P2Anim == false){
		P2Anim = true;
		shield.push(new Shield(player[0].x+15, player[0].y+15, 30))
		}
		} else if(powerup3 == true && selectedPowerup == 3)
		{
		powerup3 = false;
		wipeout.push(new Wipeout(0, 450, 300, 5));
		if(P3Anim == false){
		startWipeout();
		P3Anim = true;
		}
		}

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
	
	
		function animate() {
		console.log(shieldLives);
		ctx.clearRect(0, 0, 300, 500)
		/*
		* Animate the Shield
		*/
		var shieldLength = shield.length;
		for (var i = 0; i < shieldLength; i++){
			var tmpShield = shield[i];
				ctx.fillStyle = "aqua";
				ctx.beginPath();
				ctx.arc(tmpShield.x, tmpShield.y, 30, 0, Math.PI*2, false);
				ctx.closePath(); 
				ctx.fill();
			}
		/*
		* Animate the player movement
		*/


		var playerLength = player.length;
		for (var i = 0; i < playerLength; i++){
			var tmpPlayer = player[i];
				ctx.fillStyle = "red";
				ctx.fillRect(tmpPlayer.x, tmpPlayer.y, 30, 30);
		}
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
		}
		
		if (P3Anim == true && wipeout.length > 0){
		if (tmpEnemies.y+30 > wipeout[0].y-5){ 
			
			for(var i=0; i<enemies.length; i++) {
			if (enemies[i] == tmpEnemies){
				enemies.splice(enemies.indexOf(enemies[i]), 1);
					}
				}
		}
		}
		
			if (P1Anim == true && bullet.length > 0){
		if (!(tmpEnemies.x+30 < bullet[0].x) &&
			!(bullet[0].x+30 < tmpEnemies.x) &&
			!(tmpEnemies.y+30 < bullet[0].y) &&
			!(bullet[0].y+30 < tmpEnemies.y)) { 
			
			for(var i=0; i<enemies.length; i++) {
			if (enemies[i] == tmpEnemies){
				enemies.splice(enemies.indexOf(enemies[i]), 1);
				bullet.splice(bullet.indexOf(bullet[i]), 1);
					}
				}
		}
		}
		
		if (P2Anim == true && shield.length > 0){
		if (!(tmpEnemies.x+30 < shield[0].x-30) &&
			!(shield[0].x+30 < tmpEnemies.x) &&
			!(tmpEnemies.y+30 < shield[0].y-30) &&
			!(shield[0].y+30 < tmpEnemies.y)) { 
			
			
			for(var i=0; i<enemies.length; i++) {
			if (enemies[i] == tmpEnemies){
			enemies.splice(enemies.indexOf(enemies[i]), 1);
			}
			}
			
			
			shieldLives -= 1;
			if(shieldLives == 0){
			P2Anim = false;
			shield.splice(shield.indexOf(shield[i]), 1);
			}
		}
		}
		
		
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
			var tmpPowerups = powerups[i];;
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
			
			var newPower = Math.round(Math.random()*(3-1)+1);
			
			if(newPower == 1){
				powerup1 = true;
			}else if(newPower == 2){
				powerup2 = true;
			}else if(newPower == 3){
				powerup3 = true;
			}
			
		for(var i=0; i<powerups.length; i++) {
			if (powerups[i] == tmpPowerups){
				powerups.splice(powerups.indexOf(powerups[i]), 1);
					}
				}
			}
		}
		
		/*
		* Move the player and the shield if we have one!
		*/
		if( direction == 'left'){
			if(P2Anim == false){
				if(player[0].x-8 < 0){
					player[0].x = 0;
				} else {
					player[0].x -= 8;
				}
			}else{
				if(player[0].x-8 < 15){
					player[0].x = 15;
				} else {
					player[0].x -= 8;
				}
				if(shield[0].x-8 < 30){
					shield[0].x = 30;
				} else {
					shield[0].x -= 8;
				}
			}
		} else if( direction == 'right'){
			if(P2Anim == false){
				if(player[0].x+8 > 270){
					player[0].x = 270;
				} else {
					player[0].x += 8;
				}
			}else{
				if(player[0].x+8 > 255){
					player[0].x = 255;
				} else {
					player[0].x += 8;
				}
				if(shield[0].x+8 > 270){
					shield[0].x = 270;
				} else {
					shield[0].x += 8;
				}
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
			velocity += 1;
		}
		
		if(playAnimation){
			setTimeout(levelCheck, 1000);
		}
		
		}
		

	/*
	* Animate the wipeout
	*/
	
	function startWipeout(){
	
		if(wipeout.length < 1){
		}else{
		
		var wipeoutLength = wipeout.length;
		for (var i = 0; i < wipeoutLength; i++) {
			var tmpWipeout = wipeout[i];
			if(tmpWipeout.y < -10){
				wipeout.splice(wipeout.indexOf(powerups[i]), 1);
				P3Anim = false;
			
			} else {
					tmpWipeout.y -= 3;
			}
		}
		
		ctx.fillStyle = "red";
		ctx.fillRect(tmpWipeout.x, tmpWipeout.y, 300, 5);
		
				if(playAnimation){
			setTimeout(startWipeout, 33);
		}
	
	}
	}
	
	function startBullet(){
	
		if(bullet.length < 1){
		}else{
		
		var bulletLength = bullet.length;
		for (var i = 0; i < bulletLength; i++){
			var tmpBullet = bullet[i]
			if(tmpBullet.y < 0){
			bullet.splice(bullet.indexOf(bullet[i]), 1);
			P1Anim = false;
			
			} else {
				tmpBullet.y -= 5;
				}
				
				}
			}
			
		ctx.fillStyle = "black";
		ctx.fillRect(tmpBullet.x, tmpBullet.y, 3, 5);
		
			if(playAnimation){
			setTimeout(startBullet, 33);
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
	Colour in options we have selected
	*/
	function colourOption(){
	ctx.beginPath();
		ctx.moveTo(305, 40);
		ctx.lineTo(445, 40);
		ctx.lineTo(445, 65);
		ctx.lineTo(305, 65);
		ctx.lineTo(305, 40);
		ctx.closePath();
		if(powerup1 == true && selectedPowerup == 1){
			ctx.fillStyle = "green";
			ctx.fill();
			ctx.fillStyle = "black";
		} else if(powerup1 == true && selectedPowerup !== 1) {
			ctx.fill();
		} else {
			ctx.fillStyle = "white";
			ctx.fill();
			ctx.fillStyle = "black";
		}
		ctx.font = '20px san-serif';
		ctx.fillStyle = "white";
		ctx.fillText("Bullet", 350, 65);
		ctx.fillStyle = "black";
		ctx.beginPath();
		ctx.moveTo(305, 70);
		ctx.lineTo(445, 70);
		ctx.lineTo(445, 95);
		ctx.lineTo(305, 95);
		ctx.lineTo(305, 70);
		ctx.closePath();
		if(powerup2 == true && selectedPowerup == 2){
			ctx.fillStyle = "green";
			ctx.fill();
			ctx.fillStyle = "black";
		} else if(powerup2 == true && selectedPowerup !== 2) {
			ctx.fill();
		} else {
			ctx.fillStyle = "white";
			ctx.fill();
			ctx.fillStyle = "black";
		}
		ctx.font = '20px san-serif';
		ctx.fillStyle = "white";
		ctx.fillText("Shield", 348, 95);
		ctx.fillStyle = "black";
		ctx.beginPath();
		ctx.moveTo(305, 100);
		ctx.lineTo(445, 100);
		ctx.lineTo(445, 125);
		ctx.lineTo(305, 125);
		ctx.lineTo(305, 100);
		ctx.closePath();
		if(powerup3 == true && selectedPowerup == 3){
			ctx.fillStyle = "green";
			ctx.fill();
			ctx.fillStyle = "black";
		} else if(powerup3 == true && selectedPowerup !== 3){
			ctx.fill();
		} else {
			ctx.fillStyle = "white";
			ctx.fill();
			ctx.fillStyle = "black";
		}
		ctx.font = '20px san-serif';
		ctx.fillStyle = "white";
		ctx.fillText("Wipeout", 340, 123);
		ctx.fillStyle = "black";
	
		if(playAnimation == true && pauseScore == false){
			setTimeout(colourOption, 33);
		}
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
		
		if(playAnimation){
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
	colourOption();
});