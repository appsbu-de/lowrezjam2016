Lowrez.MainMenu = function(game) {};

Lowrez.MainMenu.prototype = {

	create: function() {
		this.game.stage.backgroundColor = '#ffffff';
	},

	play: function() {
		this.state.start('Game');
	},

	update: function() {

	},

	render: function() {
		pixelcontext.drawImage(this.game.canvas, 0, 0, 64, 64, 0, 0, pixelwidth, pixelheight);
	}
};
