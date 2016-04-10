Lowrez.Help = function(game) {};

Lowrez.Help.prototype = {

	create: function() {
		var fontSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,;:?!-_~#\"'&()[]|`\\/@°+=*$£€<>%áéíóú";

		this.game.stage.backgroundColor = '#b4bdef';
		this.background = this.add.tileSprite(0, 58, 64, 6, 'ground');
		this.logo = this.add.sprite(0, 0, 'logo');

		var tween = this.add.tween(this.logo)
							.to({x: '-' + this.logo.width/2}, 4000, Phaser.Easing.Quadratic.InOut, true, 0, -1);
		tween.yoyo(true);

		var help = this.add.retroFont('font', 6, 11, fontSet, 8, 3, 0);
		help.text = "You are the Ball. Press [SPACE] and let the ball bounce. " +
					 "Hold [SPACE] to keep the ball on the ground, release to bounce. Avoid opponents "+
					 "and try to get some goals to gain more score! Have fun! ";

		var back = this.add.retroFont('font', 6, 11, fontSet, 8, 3, 0);
		back.text = "Back: A";

		var backImage = this.add.image(this.world.centerX, 32, back);
		backImage.anchor.set(0.5);

		this.helpImage = this.add.image(64, 49, help);
		this.helpImage.tint = 0x000000;
		this.backKey = this.input.keyboard.addKey(Phaser.Keyboard.A);
	},

	goto: function(state) {
		this.state.start(state);
	},

	update: function() {
		if (this.backKey.isDown) {
			this.goto('MainMenu');
		}
		this.helpImage.position.x -= 0.5;

		if (this.helpImage.position.x < (this.helpImage.width * -1)) {
			this.helpImage.position.x = 64;
		}
		this.background.tilePosition.x -= this.game.CONST.BACKGROUND_SPEED;
	},

	render: function() {
		pixelcontext.drawImage(this.game.canvas, 0, 0, 64, 64, 0, 0, pixelwidth, pixelheight);
	}
};
