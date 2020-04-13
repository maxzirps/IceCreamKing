import Phaser from "phaser"
import Bootloader from "./scenes/boot-loader"
import MainGame from "./scenes/main-game"
import "../styles.css"
import PlayerPlugin from "./objects/player";



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
    plugins: {
        global: [
            { key: 'PlayerPlugin', plugin: PlayerPlugin }
        ]
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [Bootloader, MainGame]
};


// eslint-disable-next-line no-new
new Phaser.Game(config);