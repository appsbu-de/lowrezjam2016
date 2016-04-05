Lowrez.Game = function(game) {

};

Lowrez.Game.prototype = {
	create: function() {
		var fontSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,;:?!-_~#\"'&()[]|`\\/@°+=*$£€<>%áéíóú";
		this.scoreValue = 0;

		this.game.stage.backgroundColor = '#b4bdef';
		this.ball = new Ball(this.game, this.game.CONST.BALL_X, this.game.CONST.BALL_X, 0);
		this.ball.anchor.set(0.5);

		this.background = this.add.tileSprite(0, 58, 64, 6, 'ground');
		this.physics.enable(this.background, Phaser.Physics.ARCADE);
		this.background.body.immovable = true;
		this.background.body.allowGravity = false;

		this.goals = this.add.physicsGroup();
		this.goals.createMultiple(4, 'goal', 0, false);

		this.score = this.add.retroFont('font', 6, 11, fontSet, 8, 3, 0);
		this.score.text = this.scoreValue + "";

		this.scoreText = this.add.image(4, 4, this.score);
		this.scoreText.anchor.set(0);

		this.spawnGoal();
	},

	update: function() {
		this.physics.arcade.collide(this.background, this.ball);
		this.background.tilePosition.x -= this.game.CONST.BACKGROUND_SPEED;
	},

	quitGame: function(pointer) {
		this.state.start('MainMenu');
	},

	spawnGoal: function () {
		var item = this.goals.getFirstDead();

		if (item) {
			item.reset(this.game.CONST.GOAL_START_X, this.game.CONST.BOTTOM);
			item.anchor.set(0, 1);
			item.body.velocity.x = -30;
			item.body.immovable = true;
			item.body.allowGravity = false;
			item.checkWorldBounds = true;
			item.outOfBoundsKill = true;
			this.scoreValue++;
			this.score.text = "" + this.scoreValue;
		}

		this.time.events.add(Phaser.Timer.SECOND * this.rnd.integerInRange(2, 4), this.spawnGoal, this);
	},

	render: function() {
		pixelcontext.drawImage(this.game.canvas, 0, 0, 64, 64, 0, 0, pixelwidth, pixelheight);
	}
};
