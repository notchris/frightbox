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

    // Ghost
    this.load.spritesheet('ghost', './src/assets/img/ghost.png', {
        frameWidth: 16, frameHeight: 16, margin: 0, spacing: 0,
    });

    // Zombie
    this.load.spritesheet('zombie', './src/assets/img/zombie.png', {
        frameWidth: 20, frameHeight: 33, margin: 0, spacing: 0,
    });

    // Demon
    this.load.spritesheet('demon', './src/assets/img/demon.png', {
        frameWidth: 23, frameHeight: 34, margin: 0, spacing: 0,
    });

    // Chort
    this.load.spritesheet('chort', './src/assets/img/chort.png', {
        frameWidth: 14, frameHeight: 23, margin: 0, spacing: 0,
    });

    // Menu
    this.load.image('title', 'src/assets/img/frightbox-sign-large.png');

    // Game Over
    this.load.image('gameover', 'src/assets/img/game-over-large.png');

    // Box Item
    this.load.image('boxItem', "./src/assets/img/box.png")


    // Boxes
    this.load.tilemapTiledJSON("map", "./src/mapA.json");
    this.load.image("box", "./src/assets/img/boxes-sheet.png");

    // Audio
    this.load.audio('nightmare', './src/assets/audio/nightmare.ogg');
    this.load.audio('item', './src/assets/audio/item.wav');
    this.load.audio('death', './src/assets/audio/death.wav')


    }

    create () {
        this.scene.start('Menu')
    }

    update () {
    }

}