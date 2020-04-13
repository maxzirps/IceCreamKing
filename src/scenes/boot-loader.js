/* global Phaser */

export default class Bootloader extends Phaser.Scene {
    constructor() {
        super({ key: 'Bootloader' });
    }

    preload() {
        this.add.text(16, 16, 'Loading ...', { fontSize: '62px', fill: '#000' });
        this.load.spritesheet('king', 'assets/king.png', { frameWidth: 736/23, frameHeight: 23 });
        this.load.image('ice-cream', 'assets/ice-cream.png')
        this.load.image('ground', 'assets/ground.png');
        this.load.image('background', 'assets/background.png');
    }

    update() {
        this.scene.start('MainGame');
    }
}