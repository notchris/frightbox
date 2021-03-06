import * as Phaser from 'phaser';
import Player from './Player';

export default class Controls extends Phaser.GameObjects.GameObject {

    constructor(scene, type, cursors, player) {
      super(scene, type);

      this.scene = scene;
      this.player = player;
      this.cursors = cursors;
      this.keys = this.cursors.createCursorKeys();
      this.keyW = this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.keyA = this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.keyS = this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      this.keyD = this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      this.keyE = this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.E);
      this.keyEnter = this.cursors.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update () {
      /** Reset Velocity */
      this.player.body.setVelocity(0);

      /** Idle */
      if (!this.keys.left.isDown
            && !this.keys.right.isDown
            && !this.keys.up.isDown
            && !this.keys.down.isDown
            && !this.keyW.isDown
            && !this.keyA.isDown
            && !this.keyS.isDown
            && !this.keyD.isDown) {
        switch (this.player.direction) {
          case 'up':
            this.player.anims.play('idleUp', true);
            break;
          case 'down':
            this.player.anims.play('idleDown', true);
            break;
          case 'left':
            this.player.anims.play('idleLeft', true);
            break;
          case 'right':
            this.player.anims.play('idleRight', true);
            break;
          default:
            break;
        }
      }

      if (Phaser.Input.Keyboard.JustDown(this.keyEnter)) {
        //
      }

      /** Freeze controls & set player to idle */
      if (this.player.frozen) {
        this.player.anims.play(`idle${this.player.direction.charAt(0).toUpperCase()}${this.player.direction.slice(1)}`, true);
        this.player.use = false;
        return;
      }

      /** Movement */

      if (this.keys.left.isDown || this.keyA.isDown) {
        this.player.moveLeft();
      } else if (this.keys.right.isDown || this.keyD.isDown) {
        this.player.moveRight();
      } else if (this.keys.up.isDown || this.keyW.isDown) {
        this.player.moveUp();
      } else if (this.keys.down.isDown || this.keyS.isDown) {
        this.player.moveDown();
      }

      /** Use (Action) */
      if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
        this.player.use = true;
      } else {
        this.player.use = false;
      }
    }
}