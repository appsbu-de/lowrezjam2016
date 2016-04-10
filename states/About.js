Lowrez.About = function(game) {};

Lowrez.About.prototype = {

	create: function() {
		var fontSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,;:?!-_~#\"'&()[]|`\\/@°+=*$£€<>%áéíóú";

		this.game.stage.backgroundColor = '#000000';

		this.backKey = this.input.keyboard.addKey(Phaser.Keyboard.A);

		this.about = this.add.retroFont('font', 6, 11, fontSet, 8, 3, 0);
		this.about.multiLine = true;
		this.about.text = "Made by\n" +
						 "Carsten\n" +
						 "Sandtner\n\n" +
						 "@casarock\n\n" +
						 "Back: A";

		this.logo = this.add.sprite(0, 64, 'logo');

		var tween = this.add.tween(this.logo)
							.to({x: '-' + this.logo.width/2}, 4000, Phaser.Easing.Quadratic.InOut, true, 0, -1);

		tween.yoyo(true, 0);
		this.aboutTextImage = this.add.image(4, 66 + this.logo.height, this.about);

	},

	goto: function(state) {
		this.state.start(state);
	},

	update: function() {
		if (this.backKey.isDown) {
			this.goto('MainMenu');
		}

		if (this.aboutTextImage.position.y < (this.aboutTextImage.height * -1)) {
			this.aboutTextImage.position.y = 66 + this.logo.height;
			this.logo.y = 64;
		}
		this.aboutTextImage.position.y -= 0.25;
		this.logo.position.y -= 0.25;
	},

	render: function() {
		pixelcontext.drawImage(this.game.canvas, 0, 0, 64, 64, 0, 0, pixelwidth, pixelheight);
	}
};
