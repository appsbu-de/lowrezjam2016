Lowrez.MainMenu = function(game) {};

Lowrez.MainMenu.prototype = {

	create: function() {
		var fontSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,;:?!-_~#\"'&()[]|`\\/@°+=*$£€<>%áéíóú";

		this.game.stage.backgroundColor = '#b4bdef';

		this.background = this.add.tileSprite(0, 58, 64, 6, 'ground');

		this.clouds = this.add.physicsGroup();
		this.clouds.createMultiple(4, 'cloud', 0, false);

		this.highscoreText = this.add.retroFont('font', 6, 11, fontSet, 8, 3, 0);
		this.highscoreText.text = "00";

		this.menuTextStart = this.add.retroFont('font', 6, 11, fontSet, 8, 3, 0);
		this.menuTextStart.text = "A - START";

		this.menuTextHelp = this.add.retroFont('font', 6, 11, fontSet, 8, 3, 0);
		this.menuTextHelp.text = "B - HELP";

		this.menuTextAbout = this.add.retroFont('font', 6, 11, fontSet, 8, 3, 0);
		this.menuTextAbout.text = "X - ABOUT";

		this.highscore = this.add.image(this.world.centerX, this.world.centerY, this.highscoreText);
		this.highscore.anchor.set(0.5);
		this.highscore.tint = 0xeeeeee;

		this.startText = this.add.image(6, this.game.CONST.MENU_TEXT_START_Y, this.menuTextStart);
		this.startText.anchor.set(0, 0.5);

		this.helpText = this.add.image(6, this.game.CONST.MENU_TEXT_START_Y + 12, this.menuTextHelp);
		this.helpText.anchor.set(0, 0.5);

		this.aboutText = this.add.image(6, this.game.CONST.MENU_TEXT_START_Y + 24, this.menuTextAbout);
		this.aboutText.anchor.set(0, 0.5);

		this.startText.tint = this.aboutText.tint = this.helpText.tint = 0x000000;

		this.logo = this.add.sprite(0, 0, 'logo');

		var tween = this.add.tween(this.logo)
							.to({x: '-' + this.logo.width/2}, 4000, Phaser.Easing.Quadratic.InOut, true, 0, -1);

		tween.yoyo(true, 0);

		var tween2 = this.add.tween(this.highscore.scale)
							.to({x: 4, y: 4}, 2000, Phaser.Easing.Bounce.Out, true, 0, -1);

		tween2.yoyo(true, 0);

		this.startKey = this.input.keyboard.addKey(Phaser.Keyboard.A);
		this.helpKey = this.input.keyboard.addKey(Phaser.Keyboard.H);
		this.aboutKey = this.input.keyboard.addKey(Phaser.Keyboard.X);
		this.spawnCloud();
	},

	play: function() {
		this.state.start('Game');
	},

	update: function() {
		if (this.startKey.isDown) {
			this.play();
		}

		this.background.tilePosition.x -= this.game.CONST.BACKGROUND_SPEED;
	},

	spawnCloud: function() {
		var cloud = this.clouds.getFirstDead();

		if (cloud) {
			cloud.reset(64, this.rnd.integerInRange(15, 45));
			cloud.anchor.set(0, 1);
			cloud.body.velocity.x = -10 - this.rnd.integerInRange(0, 15);
			cloud.body.immovable = true;
			cloud.body.allowGravity = false;
			cloud.checkWorldBounds = true;
			cloud.outOfBoundsKill = true;
		}

		this.time.events.add(Phaser.Timer.SECOND * this.rnd.integerInRange(1, 2), this.spawnCloud, this);
	},

	render: function() {
		pixelcontext.drawImage(this.game.canvas, 0, 0, 64, 64, 0, 0, pixelwidth, pixelheight);
	}
};
