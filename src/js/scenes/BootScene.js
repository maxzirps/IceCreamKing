export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        this.add.text(window.innerWidth/2, window.innerHeight/2, 'Loading ...', {fontSize: '62px', fill: '#e6e3e0', align: 'center', });

        this.load.spritesheet('king', 'assets/king.png', { frameWidth: 736 / 23, frameHeight: 23 });
        this.load.image('ice-cream', 'assets/ice-cream.png')
        this.load.image('ground', 'assets/ground.png');
        this.load.image('background', 'assets/background.png');
    }

    update() {
        this.scene.start('GameScene');
    }
}