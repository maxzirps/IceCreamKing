import React, { useEffect } from 'react'
import Phaser from 'phaser'

const Game: React.FC = () => {
    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            parent: 'phaser-container',
            width: 1000,
            height: 600,
            scene: {
                preload: function (this: Phaser.Scene) {
                    this.load.image('logo', "./assets/docker-whale.png")
                },
                create: function (this: Phaser.Scene) {
                    this.add.image(400, 150, 'logo')
                },
            },
        }

        new Phaser.Game(config)
    })

    return (
        <div>
            <h1>Ice cream king</h1>
            <div className="phaserContainer" id="phaser-container"></div>
        </div>
    )
}

export default Game
