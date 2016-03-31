var Lowrez = {};

Lowrez.Boot = function (game) {

};

Lowrez.Boot.prototype = {

    init: function () {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
    },

    preload: function () {
        this.load.image('appsbude', 'images/appsbude-logo.jpg');
    },

    create: function () {
        var pixelCanvas = document.getElementById("pixel");
        pixelcontext = pixelCanvas.getContext("2d");
        pixelwidth = pixelCanvas.width;
        pixelheight = pixelCanvas.height;
        Phaser.Canvas.setSmoothingEnabled(pixelcontext, false);

        this.state.start('Preloader');
    },

    render: function() {
        pixelcontext.drawImage(this.game.canvas, 0, 0, 64, 64, 0, 0, pixelwidth, pixelheight);
    }

};
