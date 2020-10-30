import Phaser from 'phaser';
export default class Loading extends Phaser.Scene {

    constructor() {
        super({key: "Loading"});
    }

    preload () {

    // Player
    this.load.spritesheet('player', './src/assets/img/player.png', {
        frameWidth: 16, frameHeight: 32, margin: 0, spacing: 0,
    });


    // Boxes
    this.load.tilemapTiledJSON("map", "./src/mapA.json");
    this.load.image("box", "./src/assets/img/boxes-sheet.png");


    }

    create () {
        this.scene.start('Menu')
    }

    update () {
    }

}