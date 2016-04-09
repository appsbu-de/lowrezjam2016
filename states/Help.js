Lowrez.Help = function(game) {};

Lowrez.Help.prototype = {

	create: function() {
		var fontSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,;:?!-_~#\"'&()[]|`\\/@°+=*$£€<>%áéíóú";

		this.game.stage.backgroundColor = '#b4bdef';
		this.backKey = this.input.keyboard.addKey(Phaser.Keyboard.A);
	},

	goto: function(state) {
		this.state.start(state);
	},

	update: function() {
		if (this.backKey.isDown) {
			this.goto('MainMenu');
		}
	},

	render: function() {
		pixelcontext.drawImage(this.game.canvas, 0, 0, 64, 64, 0, 0, pixelwidth, pixelheight);
	}
};
