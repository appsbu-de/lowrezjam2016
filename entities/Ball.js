Ball = function(game, x, y, rotateSpeed) {
    Phaser.Sprite.call(this, game, x, y, 'ball');
    
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.bounce.y = 1.0;
    this.body.collideWorldBounds = true;
    game.add.existing(this);
};

Ball.prototype = Object.create(Phaser.Sprite.prototype);
Ball.prototype.constructor = Ball;

/**
 * Automatically called by World.update
 */
Ball.prototype.update = function() {

};
