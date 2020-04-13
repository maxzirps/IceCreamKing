import Phaser from "phaser"

export default class Ground extends Phaser.GameObjects.Image {
    create() {
        const platforms = this.physics.add.staticGroup();
        const ground = this.textures.get("ground").getSourceImage()
        for (let i = 0; ground.width * i < this.game.scale.width + ground.width; i += 1) {
            platforms.create(i * ground.width, this.game.scale.height - (ground.height / 2), 'ground')

        }
    }
}




