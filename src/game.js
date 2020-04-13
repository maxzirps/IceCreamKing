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
    this.textures.remove("king")
    this.load.image('background', 'assets/background.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('ice-cream', 'assets/ice-cream.png')
    this.load.spritesheet('king', 'assets/king.png', { frameWidth: 736/23, frameHeight: 23 });
}

function create() {
    const image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
    const scaleX = this.cameras.main.width / image.width
    const scaleY = this.cameras.main.height / image.height
    const scale = Math.max(scaleX, scaleY)
    image.setScale(scale).setScrollFactor(0)

    const platforms = this.physics.add.staticGroup();
    const ground = this.textures.get("ground").getSourceImage()
    for (let i = 0; ground.width * i < this.game.scale.width+ground.width; i+=1){
        platforms.create(i * ground.width, this.game.scale.height-(ground.height/2), 'ground')

    }



    const iceCreams = this.physics.add.group();

    this.time.addEvent({
        delay: 1000,
        callback: () => {
            const rand = Math.random() * (window.innerWidth);

            iceCreams.create(rand, 0, 'ice-cream')
        },
        loop: true
    })

    this.physics.add.collider(platforms, iceCreams, removeIceCream, null, this);
    const kingIMG = this.textures.get("king").getSourceImage()
    player = this.physics.add.sprite(100,this.game.scale.height-(ground.height) - kingIMG.height*5/2, 'king').setScale(5)
    this.physics.add.collider(player, platforms);

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('king', { start: 14, end: 17 }),
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
        frames: this.anims.generateFrameNumbers('king', { start: 14, end: 17 }),
        frameRate: 10,
        repeat: -1,
    });
    this.physics.add.overlap(player, iceCreams, collectIceCream, null, this);
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

}

function update() {
    const cursors = this.input.keyboard.createCursorKeys();
    const pointer = this.input.activePointer;
    const velocity = Math.max(150, window.innerWidth / 5)
    const center = window.innerWidth* window.devicePixelRatio / 2
    let mobileTouchPosition = ""
    if (pointer.isDown) {
        const touchX = pointer.x;
        if (touchX > center) {
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





const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-hook',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth* window.devicePixelRatio,
        height: window.innerHeight* window.devicePixelRatio
    },
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