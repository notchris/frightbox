import Phaser from 'phaser';
export default class Enemy extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y, texture)
    {
        super(scene, x, y);
        
        this.scene = scene;
        this.setTexture(texture, 0);
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.setPosition(x, y);
        this.setOrigin(0.5);
        this.body.setBounce(0);
        this.body.setCollideWorldBounds(true);
        this.x = x;
        this.y = y;
        this.speed = 80

        this.texture = texture

        this.dir = 'right'

        if (texture === 'zombie') {
          this.body.offset.y = 17
        } else if (texture === 'chort') {
          this.body.offset.y = 7
        } else if (texture === 'demon') {
          this.body.offset.y = 18
        }
        this.body.width = 16;
        this.body.height = 16;


        this.setDepth(5)

        this.directions = [
          "left",
          "right",
          "up",
          "down"
        ]

        this.lastX = 'right'

        const frames = this.scene.anims.generateFrameNumbers('zombie', {});
        this.scene.anims.create({
          key: 'zombieTest',
          frames: [frames[0], frames[1], frames[2], frames[3]],
          duration: 500,
          repeat: -1,
        });
        const framesB = this.scene.anims.generateFrameNumbers('demon', {});
        this.scene.anims.create({
          key: 'demonTest',
          frames: [framesB[0], framesB[1], framesB[2], framesB[3]],
          duration: 500,
          repeat: -1,
        });

    }

    rndDir () {
      return this.directions[Math.floor(Math.random() * this.directions.length)];
    }

    preUpdate (time, delta) {
        super.preUpdate(time, delta);

        this.body.setVelocityX(this.speed);

        if (this.texture === 'zombie') {
          this.anims.play('zombieTest', true);
        } else if (this.texture === 'demon') {
          this.anims.play('demonTest', true);
        }

        if (this.body.blocked.right || this.body.blocked.left || this.body.blocked.up || this.body.blocked.down) {
          
          this.dir = this.rndDir()
          
        }

        switch (this.dir) {
          case 'left':
            if (this.lastX !== 'left') {
              this.toggleFlipX()
              this.lastX = 'left'
            }
            this.body.setVelocityY(0)
            this.body.setVelocityX(-this.speed);
            break;
          case 'right':
            if (this.lastX !== 'right') {
              this.toggleFlipX()
              this.lastX = 'right'
            }
            this.body.setVelocityY(0)
            this.body.setVelocityX(this.speed)
            break;
          case 'up':
            this.body.setVelocityX(0)
            this.body.setVelocityY(-this.speed)
            break;
          case 'down':
            this.body.setVelocityX(0)
            this.body.setVelocityY(this.speed)
        }

    }

}