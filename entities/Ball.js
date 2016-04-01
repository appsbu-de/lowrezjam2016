Ball = function(game, x, y, rotateSpeed) {
    Phaser.Sprite.call(this, game, x, y, 'ball');
    this.game = game;

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.bounce.y = 0.98;
    this.body.collideWorldBounds = true;
    this.velocitySet = true;
    this.game.add.existing(this);
};

Ball.prototype = Object.create(Phaser.Sprite.prototype);
Ball.prototype.constructor = Ball;

/**
 * Automatically called by World.update
 */
Ball.prototype.update = function() {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        this.body.velocity.y = 120;
    }

    this.body.velocity.y = this.body.velocity.y > 120 ? 120 : this.body.velocity.y;
};
