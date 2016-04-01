Lowrez.Game = function(game) {

};

Lowrez.Game.prototype = {
	create: function() {
		this.game.stage.backgroundColor = '#ccc';
	},

	update: function() {

	},

	quitGame: function(pointer) {
		this.state.start('MainMenu');
	},

	render: function() {
		pixelcontext.drawImage(this.game.canvas, 0, 0, 64, 64, 0, 0, pixelwidth, pixelheight);
	}
};
