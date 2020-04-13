import Phaser from "phaser"
import BootScene from "./scenes/BootScene"
import GameScene from "./scenes/GameScene"
import "../styles.css"
import "../favicon.ico"



const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-hook',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth * window.devicePixelRatio,
        height: window.innerHeight * window.devicePixelRatio
    },
    pixelArt: true,
    roundPixels: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [BootScene, GameScene]
};


// eslint-disable-next-line no-new
new Phaser.Game(config);