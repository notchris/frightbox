import Phaser from 'phaser';
export default class Menu extends Phaser.Scene {

    constructor() {
        super({key: "Menu"});
    }

    preload () {

    }

    create () {
        const midX = this.game.config.width / 2;
        const midY = this.game.config.height / 2;

        this.add.image(midX, midY, 'title');

        const itemStart = this.add.text(midX, midY + 60, 'New Game', { fontFamily: 'Arial', fontSize: 40, color: '#ffffff', align: 'center' });
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
