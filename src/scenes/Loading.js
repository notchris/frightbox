import Phaser from 'phaser';
export default class Loading extends Phaser.Scene {

    constructor() {
        super({key: "Loading"});
    }

    preload () {
    this.load.spritesheet('player', './src/assets/img/player.png',
      {
        frameWidth: 16, frameHeight: 32, margin: 0, spacing: 0,
      });
    }

    create () {
        this.scene.start('Menu')
    }

    update () {
    }

}