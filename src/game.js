/* global Phaser */


let player
let score = 0;
let scoreText;

function collectIceCream(player, iceCream) {
    iceCream.disableBody(true, true);
    score += 1;
    scoreText.setText(`Score: ${score}`);
}

function removeIceCream(platform, iceCream) {
    iceCream.disableBody(true, true);
}

function preload() {
    // this.textures.remove('king')
    this.load.image('background', 'assets/background.png');
    this.load.image('dandelion', 'assets/dandelion.png');
    this.load.image('weed', 'assets/weed.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('ice-cream', 'assets/ice-cream.png')
    this.load.spritesheet('king', 'assets/king.png', { frameWidth: 240, frameHeight: 420 });
}

function create() {
    const scaleRatio = window.devicePixelRatio / 2;
    const floorHeight = this.game.scale.height
    const image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
    const scaleX = this.cameras.main.width / image.width
    const scaleY = this.cameras.main.height / image.height
    const scale = Math.max(scaleX, scaleY)
    image.setScale(scale).setScrollFactor(0)

    const platforms = this.physics.add.staticGroup();
    const realPlatformWidth = 213 * scaleRatio;
    const realPlatformHeight = 128 * scaleRatio;
    for (let i = 0; (i - 1) * realPlatformWidth < window.innerWidth; i += 1) {
    platforms.create(realPlatformWidth * i, floorHeight - realPlatformHeight/2, 'ground').setScale(scaleRatio).refreshBody();
    }
    this.add.image(this.game.scale.width / 1.2, floorHeight-128, 'weed').setScale(scaleRatio)
    this.add.image(this.game.scale.width / 4.2, floorHeight-128, 'dandelion').setScale(scaleRatio)


    const iceCreams = this.physics.add.group();

    this.time.addEvent({
        delay: 1000,
        callback: () => {
            const rand = Math.random() * (window.innerWidth);

            iceCreams.create(rand, 0, 'ice-cream').setScale(scaleRatio);
        },
        loop: true
    })

    this.physics.add.collider(platforms, iceCreams, removeIceCream, null, this);


    player = this.physics.add.sprite(100, floorHeight-180, 'king').setScale(scaleRatio*0.8);
    this.physics.add.collider(player, platforms);

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('king', { start: 1, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'king', frame: 0 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('king', { start: 1, end: 3 }),
        frameRate: 10,
        repeat: -1,
    });
    this.physics.add.overlap(player, iceCreams, collectIceCream, null, this);
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    // this.scale.on('resize', resize, this);
}

function update() {
    const cursors = this.input.keyboard.createCursorKeys();
    const pointer = this.input.activePointer;
    const velocity = Math.max(150, window.innerWidth / 7)
    let mobileTouchPosition = ""
    if (pointer.isDown) {
        const touchX = pointer.x;
        if (touchX > 500) {
            mobileTouchPosition = "right"
        } else {
            mobileTouchPosition = "left"
        }
    }

    this.input.on('pointerup', () => {
        mobileTouchPosition = ""
    });

    if (cursors.left.isDown || mobileTouchPosition === "left") {
        player.setVelocityX(-velocity);
        player.setFlip(true, false)
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown || mobileTouchPosition === "right") {
        player.setVelocityX(velocity);
        player.setFlip(false, false)
        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

}

// function resize(gameSize, baseSize, displaySize, resolution) {
//     const { width } = gameSize;
//     const { height } = gameSize;

//     this.cameras.resize(width, height);

//     this.bg.setSize(width, height);
//     this.logo.setPosition(width / 2, height / 2);
// }


const config = {
    type: Phaser.AUTO,
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: (window.innerWidth * window.devicePixelRatio),
    height: (window.innerHeight * window.devicePixelRatio),
    parent: 'phaser-hook',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload,
        create,
        update
    }
};

const game = new Phaser.Game(config);
