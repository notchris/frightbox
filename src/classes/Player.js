import Phaser from 'phaser';
export default class Player extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y);

        this.scene = scene;
        this.setTexture('player');
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.setPosition(x, y);
        this.setOrigin(0.5);
        this.body.setBounce(0);
        this.body.setCollideWorldBounds(true);
        this.x = x;
        this.y = y;

        this.body.setCircle(5);
        this.body.width = 10;
        this.body.height = 10;
        this.body.offset.x = 3;
        this.body.offset.y = 14;

        this.setDepth(5)

        /** Custom properties */
        this.speed = 80;
        this.direction = 'down';
        this.use = false;
        this.frozen = false;
        this.dead = false;

        /** Player Use Sensor */

      /** Sprite Animations */
      const frames = this.scene.anims.generateFrameNumbers('player', {});
      this.scene.anims.create({
        key: 'idleUp',
        frames: [frames[8]],
        frameRate: 1,
        repeat: -1,
      });

      this.scene.anims.create({
        key: 'idleDown',
        frames: [frames[0]],
        frameRate: 1,
        repeat: -1,
      });

      this.scene.anims.create({
        key: 'idleLeft',
        frames: [frames[12]],
        frameRate: 1,
        repeat: -1,
      });

      this.scene.anims.create({
        key: 'idleRight',
        frames: [frames[4]],
        frameRate: 1,
        repeat: -1,
      });

      this.scene.anims.create({
        key: 'walkUp',
        frames: [frames[8], frames[9], frames[10], frames[11]],
        frameRate: 6,
        repeat: -1,
      });

      this.scene.anims.create({
        key: 'walkDown',
        frames: [frames[0], frames[1], frames[2], frames[3]],
        frameRate: 6,
        repeat: -1,
      });

      this.scene.anims.create({
        key: 'walkLeft',
        frames: [frames[12], frames[13], frames[14], frames[15]],
        frameRate: 6,
        repeat: -1,
      });

      this.scene.anims.create({
        key: 'walkRight',
        frames: [frames[4], frames[5], frames[6], frames[7]],
        frameRate: 6,
        repeat: -1,
      });


    }

    /** Movement */

    moveUp() {
      if (this.dead) return
      this.body.setVelocityY(-this.speed);
      this.anims.play('walkUp', true);
      this.direction = 'up';
    }

    moveDown() {
      if (this.dead) return
      this.body.setVelocityY(this.speed);
      this.anims.play('walkDown', true);
      this.direction = 'down';
    }

    moveLeft() {
      if (this.dead) return
      this.body.setVelocityX(-this.speed);
      this.anims.play('walkLeft', true);
      this.direction = 'left';
    }

    moveRight() {
      if (this.dead) return
      this.body.setVelocityX(this.speed);
      this.anims.play('walkRight', true);
      this.direction = 'right';
    }

    preUpdate (time, delta) {
        super.preUpdate(time, delta);

    }

}