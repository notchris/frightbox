import Phaser from 'phaser';
import Player from '../classes/Player';
import Controls from '../classes/Control';
export default class SceneA extends Phaser.Scene {

    constructor() {
        super({key: "SceneA"});
    }

    preload () {

    }

    create () {
        this.cameras.main.setBounds(0, 0, 14 * 16, 14 * 16);
        this.physics.world.setBounds(0, 0, 14 * 16, 14 * 16);

        const testBounds = this.add.graphics();
        testBounds.lineStyle(4, 0x000000, 1);
        testBounds.strokeRect(0, 0, this.physics.world.bounds.width, this.physics.world.bounds.height);

        this.player = new Player(this, 100, 100, 'player', 0);
        this.controls = new Controls(this, 'controls', this.input.keyboard, this.player);

        this.cameras.main.setBackgroundColor('#dddddd');
        this.cameras.main.fadeIn(1000);
        this.cameras.main.zoom = 2;
        this.cameras.main.startFollow(this.player);
    }

    update () {
        this.controls.update()
    }

}