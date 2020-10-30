import Phaser from 'phaser';
export default class Menu extends Phaser.Scene {

    constructor() {
        super({key: "Menu"});
    }

    preload () {

    }

    create () {

        //const banner = this.add.image('sign', 0, 0)
        const midX = this.game.config.width / 2;
        const midY = this.game.config.height / 2;

        let titleImg = this.add.image(midX, midY - 100, 'title');
        titleImg.setScale(4, 4)
        const itemStart = this.add.text(midX, midY + 60, 'New Game', { fontFamily: 'Arial', fontSize: 40, color: '#ffffff', align: 'center' });

        let credits = this.add.text(midX, midY + 120, 'A game by Richard, Kaley & Chris!', { fontFamily: 'Arial', fontSize: 20, color: '#ffffff', align: 'center' });
        credits.setOrigin(0.5)


        // Menu Items
        itemStart.setOrigin(0.5)
        itemStart.setInteractive({
            useHandCursor: true
        }).on('pointerdown', (pointer, localX, localY, event) => {
            this.scene.start('SceneA')
        });


    }

    update () {
        // Update loop
    }

}