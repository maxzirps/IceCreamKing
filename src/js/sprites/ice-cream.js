
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
   
}

function create() {
    const iceCreams = this.physics.add.group();

    this.time.addEvent({
        delay: 1000,
        callback: () => {
            const rand = Math.random() * (window.innerWidth);

            iceCreams.create(rand, 0, 'ice-cream')
        },
        loop: true
    })

    this.physics.add.overlap(player, iceCreams, collectIceCream, null, this);
    this.physics.add.collider(platforms, iceCreams, removeIceCream, null, this);
}






