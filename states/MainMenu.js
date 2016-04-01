Lowrez.MainMenu = function(game) {};

Lowrez.MainMenu.prototype = {

	create: function() {
		var fontSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,;:?!-_~#\"'&()[]|`\\/@°+=*$£€<>%áéíóú";

		this.game.stage.backgroundColor = '#000000';

		this.menuText = this.add.retroFont('font', 6, 11, fontSet, 8, 3, 0);
		this.menuText.text = "PRESS A";
		this.startText = this.add.image(this.world.centerX, this.world.centerY, this.menuText);
		this.startText.anchor.set(0.5);

		this.startKey = this.input.keyboard.addKey(Phaser.Keyboard.A);
	},

	play: function() {
		this.state.start('Game');
	},

	update: function() {
		if (this.startKey.isDown) {
			this.play();
		}
	},

	render: function() {
		pixelcontext.drawImage(this.game.canvas, 0, 0, 64, 64, 0, 0, pixelwidth, pixelheight);
	}
};
