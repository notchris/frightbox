import Phaser from 'phaser';
export default class Box extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y) {
        super(scene, x, y);

        this.scene = scene;
        this.setTexture('boxes', 2);
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.setPosition(x, y);
        this.setOrigin(0.5);
        this.body.setBounce(0);
        this.body.setImmovable(true);
        this.body.allowGravity = false;
        this.body.setCollideWorldBounds(true);
        this.x = x;
        this.y = y;

        this.scene.physics.add.collider(this, this.scene.player, () => {
            //
        });

    }

    preUpdate (time, delta) {
        super.preUpdate(time, delta);

    }

}