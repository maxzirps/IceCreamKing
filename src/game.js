/* global Phaser */


// FIXME: fix security issues


let player

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.spritesheet('dude', 'assets/boy.png', { frameWidth: 308, frameHeight: 412 });
}

function create() {
    this.add.image(500, 400, 'sky');
    const platforms = this.physics.add.staticGroup();
    platforms.create(0, 735, 'ground');
    platforms.create(231, 735, 'ground');
    platforms.create(231 * 2, 735, 'ground');
    platforms.create(231 * 3, 735, 'ground');
    platforms.create(231 * 4, 735, 'ground')    ;
    player = this.physics.add.sprite(100, 500, 'dude').setScale(0.3);
    this.physics.add.collider(player, platforms);

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 0 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1,
    });

}

function update() {
    const cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.setFlip(true, false)
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.setFlip(false, false)
        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }
 
}

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 800,
    parent: 'phaser-hook',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: {
        preload,
        create,
        update
    }
};

const game = new Phaser.Game(config);

