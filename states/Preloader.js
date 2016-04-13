Lowrez.Preloader = function(game) {
    this.ready = false;
    game.CONST = {
        BALL_BOUNCE: 0.85,
        BALL_MAX_VEL_Y: 160,
        BACKGROUND_SPEED: 0.5,
        BOTTOM: 58,
        BALL_X: 8,
        BALL_Y: 10,
        BALL_GROUNDED_Y: 54,
        GOAL_START_X: 64,
        OPPONENT_START_X: 63,
        OPPONENTS_JUMP_AT: 10,
        OPPONENTS_JUMP_PERCENTAGE: 60,
        OPPONENTS_MOVE_AT: 5,
        OPPONENTS_MOVE_ELASTICE_AT: 15,
        OPPONENTS_MOVE_ELASTIC_PERCENTAGE: 40,
        OPPONENTS_MOVE_PERCENTAGE: 30,
        OPPONENTS_MOVE_DELTA: 15,
        OPPONENTS_MOVE_DELTA_MAX: 30,
        MENU_TEXT_START_Y: 30
    };

    game.HIGHSCORE = this.loadScore();
};

Lowrez.Preloader.prototype = {

    preload: function() {

        this.load.image('font', 'images/font.png');
        this.load.image('ground', 'images/ground.png');
        this.load.image('goal', 'images/goal.png');
        this.load.image('opponent', 'images/opponent.png');
        this.load.image('ball', 'images/ball_new.png');
        this.load.image('cloud', 'images/cloud.png');
        this.load.image('logo', 'images/logo.png');

        this.load.audio('countdown1', 'sounds/Countdown.wav');
        this.load.audio('countdown2', 'sounds/Countdown_end.wav');
        this.load.audio('goal', 'sounds/Goal.wav');
        this.load.audio('dead', 'sounds/Dead.wav');
        this.load.audio('bounce', 'sounds/BounceBall.wav');

        this.load.audio('titlemusic', ['sounds/sailor_waltz.mp3', 'sounds/sailor_waltz.ogg']);
    },

    create: function() {
        this.game.stage.backgroundColor = '#ffffff';

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 250;

        //if (this.cache.isSoundDecoded('titlemusic') && this.ready === false) {
            this.ready = true;
            this.game.CONST.MUSIC = this.add.audio('titlemusic', 1, true);
            this.startGame();
        //}
    },

    startGame: function() {
        this.state.start('MainMenu');
    },

    loadScore: function() {
        var highScore = localStorage.getItem('highscore') || 0;

        return highScore;
    },

    render: function() {
        pixelcontext.drawImage(this.game.canvas, 0, 0, 64, 64, 0, 0, pixelwidth, pixelheight);
    }

};
