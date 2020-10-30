import Phaser from 'phaser';
import Player from '../classes/Player';
import Controls from '../classes/Control';
import BoxItem from '../classes/BoxItem';
import Box from '../classes/Box';
export default class SceneA extends Phaser.Scene {

    constructor() {
        super({key: "SceneA"});
    }

    preload () {

    }

    create () {
        this.cameras.main.setBounds(0, 0, 304, 352);
        this.physics.world.setBounds(0, 0, 304, 352);

        /*
        const testBounds = this.add.graphics();
        testBounds.lineStyle(4, 0x000000, 1);
        testBounds.strokeRect(0, 0, this.physics.world.bounds.width, this.physics.world.bounds.height);
        */

        this.player = new Player(this, 100, 100, 'player', 0);
        this.controls = new Controls(this, 'controls', this.input.keyboard, this.player);

        this.cameras.main.setBackgroundColor('#dddddd');
        this.cameras.main.fadeIn(1000);
        this.cameras.main.zoom = 2;
        this.cameras.main.startFollow(this.player);

        this.map = this.make.tilemap({key:'map'})
        let tileset = this.map.addTilesetImage('box', 'box', 16, 16)

        let boxes = this.map.createStaticLayer("boxes", tileset,0,0);
        boxes.setCollisionByProperty({ collides: true });

        this.physics.add.collider(this.player, [boxes]);


    }

    update () {
        this.controls.update()
    }

}