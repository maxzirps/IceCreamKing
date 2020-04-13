import Phaser from "phaser"
import Player from "../sprites/Player";
import Ground from "../sprites/Ground";


export default class GameScene extends Phaser.Scene {

    constructor() {
        super({ key: 'GameScene' });
       
        const score = 0;
        let scoreText;
    }



//  collectIceCream(player, iceCream) {
//     iceCream.disableBody(true, true);
//     score += 1;
//     scoreText.setText(`Score: ${score}`);
// }

//  removeIceCream(platform, iceCream) {
//     iceCream.disableBody(true, true);
// }


 create() {
     console.log("create gamescene")
    // this.player =  new Player(this, 500, 500)
    const image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
    const scaleX = this.cameras.main.width / image.width
    const scaleY = this.cameras.main.height / image.height
    const scale = Math.max(scaleX, scaleY)
    image.setScale(scale).setScrollFactor(0)

    const ground = new Ground(this).create.call(this)
    // this.player = new Player(this).create.call(this)

    // this.physics.add.collider(this.player, ground);
    // this.player.setBounce(0.2);
    // this.player.setCollideWorldBounds(true);
    // const iceCreams = this.physics.add.group();

    // this.time.addEvent({
    //     delay: 1000,
    //     callback: () => {
    //         const rand = Math.random() * (window.innerWidth);

    //         iceCreams.create(rand, 0, 'ice-cream')
    //     },
    //     loop: true
    // })

    // this.physics.add.collider(platforms, iceCreams, removeIceCream, null, this);
    // const kingIMG = this.textures.get("king").getSourceImage()
    // player = this.physics.add.sprite(100,this.game.scale.height-(ground.height) - kingIMG.height*5/2, 'king').setScale(5)
    // 




    // this.physics.add.overlap(player, iceCreams, collectIceCream, null, this);
    // scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

}

//  update() {
//     const cursors = this.input.keyboard.createCursorKeys();
//     const pointer = this.input.activePointer;
//     const velocity = Math.max(150, window.innerWidth / 5)
//     const center = window.innerWidth* window.devicePixelRatio / 2
//     let mobileTouchPosition = ""
//     if (pointer.isDown) {
//         const touchX = pointer.x;
//         if (touchX > center) {
//             mobileTouchPosition = "right"
//         } else {
//             mobileTouchPosition = "left"
//         }
//     }

//     this.input.on('pointerup', () => {
//         mobileTouchPosition = ""
//     });

//     if (cursors.left.isDown || mobileTouchPosition === "left") {
//         player.setVelocityX(-velocity);
//         player.setFlip(true, false)
//         player.anims.play('left', true);
//     }
//     else if (cursors.right.isDown || mobileTouchPosition === "right") {
//         player.setVelocityX(velocity);
//         player.setFlip(false, false)
//         player.anims.play('right', true);
//     }
//     else {
//         player.setVelocityX(0);

//         player.anims.play('turn');
//     }

// }

}