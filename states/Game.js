Lowrez.Game = function(game) {

};

Lowrez.Game.prototype = {
	create: function() {
		this.game.stage.backgroundColor = '#b4bdef';
		this.ball = new Ball(this.game, 32, 32, 0);
		this.ball.anchor.set(0.5);

		this.background = this.add.tileSprite(0, 58, 64, 6, 'ground');
		this.physics.enable(this.background, Phaser.Physics.ARCADE);
		this.background.body.immovable = true;
		this.background.body.allowGravity = false;
	},

	update: function() {
		this.physics.arcade.collide(this.background, this.ball);
		this.background.tilePosition.x -= this.game.CONST.BACKGROUND_SPEED;
	},

	quitGame: function(pointer) {
		this.state.start('MainMenu');
	},

	render: function() {
		pixelcontext.drawImage(this.game.canvas, 0, 0, 64, 64, 0, 0, pixelwidth, pixelheight);
	}
};
