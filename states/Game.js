Lowrez.Game = function(game) {

};

Lowrez.Game.prototype = {
	create: function() {
		var fontSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,;:?!-_~#\"'&()[]|`\\/@°+=*$£€<>%áéíóú";
		this.scoreValue = 0;
		this.countdown = 3;
		this.bounceSound = this.add.audio('bounce');
		this.goalSound = this.add.audio('goal');
		this.countdownSound = this.add.audio('countdown1');
		this.countdownEndSound = this.add.audio('countdown2');
		this.deadSound = this.add.audio('dead');

		this.game.stage.backgroundColor = '#b4bdef';

		this.clouds = this.add.physicsGroup();
		this.clouds.createMultiple(4, 'cloud', 0, false);

		this.ball = new Ball(this.game, this.game.CONST.BALL_X, this.game.CONST.BALL_X, 0);
		this.ball.anchor.set(0.5);

		this.background = this.add.tileSprite(0, 58, 64, 6, 'ground');
		this.physics.enable(this.background, Phaser.Physics.ARCADE);
		this.background.body.immovable = true;
		this.background.body.allowGravity = false;

		this.goals = this.add.physicsGroup();
		this.goals.createMultiple(4, 'goal', 0, false);

		this.opponents = this.add.physicsGroup();
		this.opponents.createMultiple(6, 'opponent', 0, false);

		this.score = this.add.retroFont('font', 6, 11, fontSet, 8, 3, 0);
		this.score.text = this.scoreValue + "";

		this.countdownText = this.add.retroFont('font', 6, 11, fontSet, 8, 3, 0);
		this.countdownText.text = this.countdown + "";
		this.countdownImage = this.add.image(this.world.centerX, this.world.centerX, this.countdownText);
		this.countdownImage.anchor.set(0.5);

		this.goalIndicator = this.add.retroFont('font', 6, 11, fontSet, 8, 3, 0);
		this.goalIndicator.text = "GOAAAL!";
		this.goalText = this.add.image(this.world.centerX, this.world.centerX, this.goalIndicator);
		this.goalText.anchor.set(0.5);
		this.goalText.visible = false;

		this.scoreText = this.add.image(4, 4, this.score);
		this.scoreText.anchor.set(0);
		this.scoreText.tint = 0x000000;
		this.lastCollisonWithGoal = 0;
		this.spawnedOpponents = 0;
		this.game.CONST.MUSIC.stop();
		
		this.time.events.add(Phaser.Timer.SECOND, this.countdownHandler, this);
	},

	update: function() {
		this.physics.arcade.collide(this.background, this.ball, this.ballGroundCollisionHandler, null, this);

		if (this.countdown <= 0) {
			this.physics.arcade.collide(this.background, this.opponents);
			this.physics.arcade.overlap(this.ball, this.goals, this.goalCollisionHandler, null, this);
			this.physics.arcade.overlap(this.ball, this.opponents, this.opponentCollisionHandler, null, this);
			this.background.tilePosition.x -= this.game.CONST.BACKGROUND_SPEED;
		}
	},

	countdownHandler: function() {
		this.countdown--;

		if (this.countdown <= 0) {
			this.countdownImage.visible =  false;
			this.countdownEndSound.play();
			this.spawnGoal();
			this.spawnOpponent();
			this.spawnCloud();
		}
		else {
			this.countdownImage.visible = true;
			this.countdownText.text = this.countdown + "";
			this.countdownSound.play();
			this.time.events.add(Phaser.Timer.SECOND, this.countdownHandler, this);
		}
	},

	ballGroundCollisionHandler: function() {
		if (!this.ball.isGrounded && this.countdown <= 0) {
			this.bounceSound.play();
		}
	},

	goalCollisionHandler: function(ball, goal) {
		if (this.time.now > this.lastCollisonWithGoal) {
			this.updateScoreText();
			this.showGoalAnimation(goal);
			this.lastCollisonWithGoal = this.time.now + 500;
			this.goalSound.play();
		}
	},

	opponentCollisionHandler: function() {
		this.deadSound.play();
		this.quitGame();
	},

	quitGame: function() {

		if (this.scoreValue > this.game.HIGHSCORE) {
			this.game.HIGHSCORE = this.scoreValue;
			localStorage.setItem('highscore', this.scoreValue);
		}

		this.state.start('MainMenu');
	},

	showGoalAnimation: function(goal) {
		this.goalText.position.set(this.world.centerX, this.world.centerX);
		this.goalText.alpha = 1;
		this.goalText.scale.set(1);
		this.goalText.visible = true;

		this.add.tween(this.goalText).to({alpha: 0}, 350, "Linear", true);
		this.add.tween(this.goalText.scale).to({x: 2, y: 2}, 450, "Linear", true);
	},

	spawnGoal: function () {
		var item = this.goals.getFirstDead();

		if (item) {
			item.reset(this.game.CONST.GOAL_START_X, this.game.CONST.BOTTOM);
			item.alpha = 1;
			item.body.setSize(3, 19, 0, 1);
			item.anchor.set(0, 1);
			item.body.velocity.x = -30;
			item.body.immovable = true;
			item.body.allowGravity = false;
			item.checkWorldBounds = true;
			item.outOfBoundsKill = true;
		}

		this.time.events.add(Phaser.Timer.SECOND * this.rnd.integerInRange(2, 4), this.spawnGoal, this);
	},

	spawnOpponent: function() {
		var opponent = this.opponents.getFirstDead();

		if (opponent) {
			var diceRoll = this.rnd.integerInRange(1,100);
			opponent.reset(this.game.CONST.OPPONENT_START_X, this.game.CONST.BOTTOM);
			opponent.anchor.set(0, 1);
			opponent.body.velocity.x = -30 - this.rnd.integerInRange(0, 20);
			opponent.body.immovable = true;
			opponent.body.allowGravity = false;
			opponent.checkWorldBounds = true;
			opponent.outOfBoundsKill = true;

			if (diceRoll < this.game.CONST.OPPONENTS_JUMP_PERCENTAGE
				&& this.spawnedOpponents > this.game.CONST.OPPONENTS_JUMP_AT) {

				opponent = this.jumpOpponent(opponent);
			}

			if (diceRoll < this.game.CONST.OPPONENTS_JUMP_PERCENTAGE
				&& this.spawnedOpponents > this.game.CONST.OPPONENTS_MOVE_AT) {
				opponent = this.moveOpponent(opponent);
			}

			this.spawnedOpponents++;
		}

		this.time.events.add(Phaser.Timer.SECOND * this.rnd.integerInRange(1, 4), this.spawnOpponent, this);
	},

	jumpOpponent: function(opponent) {
		opponent.body.bounce.y = 1.0;
		opponent.body.velocity.y = -(this.rnd.integerInRange(60, 85));
		opponent.body.allowGravity = true;
		opponent.body.immovable = false;

		return opponent;
	},

	moveOpponent: function(opponent) {
		var currentVelocityX = opponent.body.velocity.x;
		var easing = Phaser.Easing.Linear.None;
		var diceRoll = this.rnd.integerInRange(1,100);
		var moveDelta = this.game.CONST.OPPONENTS_MOVE_DELTA;

		opponent.body.velocity.x = currentVelocityX + this.game.CONST.OPPONENTS_MOVE_DELTA;

		if (diceRoll > this.game.CONST.OPPONENTS_MOVE_ELASTIC_PERCENTAGE
			&& this.spawnedOpponents > this.game.CONST.OPPONENTS_MOVE_ELASTICE_AT) {
			easing = Phaser.Easing.Cubic.Out;
		}

		if (this.rnd.integerInRange(1, 100) > 35) {
			moveDelta = this.rnd.integerInRange(this.game.CONST.OPPONENTS_MOVE_DELTA, this.game.CONST.OPPONENTS_MOVE_DELTA_MAX);
		}

		var tween = this.add.tween(opponent.body.velocity)
							.to({x:currentVelocityX - moveDelta}, 500, easing, true, 0, -1);

		tween.yoyo(true, 250);

		return opponent;
	},

	spawnCloud: function() {
		var cloud = this.clouds.getFirstDead();

		if (cloud) {
			cloud.reset(64, this.rnd.integerInRange(15, 30));
			cloud.anchor.set(0, 1);
			cloud.body.velocity.x = -10 - this.rnd.integerInRange(0, 30);
			cloud.body.immovable = true;
			cloud.body.allowGravity = false;
			cloud.checkWorldBounds = true;
			cloud.outOfBoundsKill = true;
		}

		this.time.events.add(Phaser.Timer.SECOND * this.rnd.integerInRange(1, 2), this.spawnCloud, this);
	},

	updateScoreText: function() {
		this.scoreValue++;
		this.score.text = "" + this.scoreValue;
	},

	render: function() {
		//this.goals.forEachAlive(this.renderGroup, this);
		pixelcontext.drawImage(this.game.canvas, 0, 0, 64, 64, 0, 0, pixelwidth, pixelheight);
	},

	renderGroup: function(member) {
		this.game.debug.body(member);
	}
};
