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
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('ice-cream', 'assets/ice-cream.png')
    this.load.spritesheet('boy', 'assets/boy.png', { frameWidth: 123, frameHeight: 165 });
}

function create() {
    this.add.image(500, 400, 'sky');
    const platforms = this.physics.add.staticGroup();
    platforms.create(0, 735, 'ground');
    platforms.create(231, 735, 'ground');
    platforms.create(231 * 2, 735, 'ground');
    platforms.create(231 * 3, 735, 'ground');
    platforms.create(231 * 4, 735, 'ground');



    const iceCreams = this.physics.add.group();

    this.time.addEvent({
        delay: 800,
        callback: () => {
            const rand = Math.random() * (950 - 40) + 40;

            iceCreams.create(rand, 0, 'ice-cream');
        },
        loop: true
    })

    this.physics.add.collider(platforms, iceCreams, removeIceCream, null, this);


    player = this.physics.add.sprite(100, 590, 'boy');
    this.physics.add.collider(player, platforms);

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('boy', { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'boy', frame: 0 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('boy', { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1,
    });
    this.physics.add.overlap(player, iceCreams, collectIceCream, null, this);
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

}

function update() {
    const cursors = this.input.keyboard.createCursorKeys();
    const pointer = this.input.activePointer;
    let mobileTouchPosition = ""
    if (pointer.isDown) {
        const touchX = pointer.x;
        if (touchX > 500){
            mobileTouchPosition = "right"
        } else {
            mobileTouchPosition = "left"
        }
    }

    this.input.on('pointerup', () => {
        mobileTouchPosition = ""
    });

    if (cursors.left.isDown || mobileTouchPosition === "left") {
        player.setVelocityX(-160);
        player.setFlip(true, false)
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown || mobileTouchPosition === "right") {
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
