import Phaser from 'phaser';
export default class BoxItem extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y) {
        super(scene, x, y);

        this.scene = scene;
        this.setTexture('boxItem');
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.setPosition(x, y);
        this.setOrigin(0);
        this.body.setBounce(0);
        this.body.setImmovable(true);
        this.body.allowGravity = false;
        this.body.setCollideWorldBounds(true);
        this.x = x;
        this.y = y;

        // Audio
        let music = this.scene.sound.add('item', {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        });

        this.scene.physics.add.collider(this, this.scene.player, () => {
            this.scene.score += 1
            this.scene.scoreText.text = `Packages: ${this.scene.score}`
            music.play()
            this.destroy()
        });

    }

    preUpdate (time, delta) {
        super.preUpdate(time, delta);

    }

}