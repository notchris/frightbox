import Phaser from 'phaser';
export default class Menu extends Phaser.Scene {

    constructor() {
        super({key: "Menu"});
    }

    preload () {

    }

    create () {
        // Title Text
        const title = this.add.text(240, 60, 'FRIGHT BOX', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00', align: 'center' });
        title.setOrigin(0.5)

        // Menu Items
        const itemStart = this.add.text(240, 180, 'New Game', { fontFamily: 'Arial', fontSize: 48, color: '#ffffff', align: 'center' });
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