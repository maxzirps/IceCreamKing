import Phaser from "phaser"

export default class Ground extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'ground');
    }

    create() {
        const platforms = this.physics.add.staticGroup();
        const ground = this.textures.get("ground").getSourceImage()
        for (let i = 0; ground.width * i < this.game.scale.width + ground.width; i += 1) {
            console.log("create plattform")
            platforms.create(i * ground.width, this.game.scale.height - (ground.height / 2), 'ground')
        }
    }

    
}




