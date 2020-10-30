import Phaser from 'phaser';
import Player from '../classes/Player';
import Controls from '../classes/Control';
import BoxItem from '../classes/BoxItem';
import Box from '../classes/Box';
import Enemy from '../classes/Enemy';
import Blood from '../classes/Blood'

export default class SceneA extends Phaser.Scene {

    constructor() {
        super({key: "SceneA"});
    }

    preload () {

    }

    init () {
        this.score = 0
        this.bloodAnim = 0
        this.locations = [
            [2,4],
            [6,6],
            [12, 14],
            [17,1],
            [17,20],
            [1,20],
            [6,18],
            [10,6],
            [10,20],
            [1,10]
        ]
    }

    create () {
        this.cameras.main.setBounds(0, 0, 304, 352);
        this.physics.world.setBounds(0, 0, 304, 352);

        // Score Text
        this.scoreText = this.add.text(10, 10, 'Packages: 0', { fontFamily: 'Arial Black', fontSize: 14, color: '#000000' });
        this.scoreText.setDepth(6)

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

        this.enemies = []

        this.physics.add.collider(this.player, [boxes]);

        // Add boxes
        for (let i = 0; i < 8; i += 1) {
            const l = this.locations[Math.floor(Math.random() * this.locations.length)];
            const item = new BoxItem(this, (l[0] * 16) + 4, (l[1] * 16) + 4)
        }


        this.enemies.push(
            new Enemy(this, (10 * 16), (20 * 16), 'ghost'),
            new Enemy(this, (1 * 16), (20 * 16), 'zombie'),
            new Enemy(this, (17 * 16), (1 * 16), 'chort'),
            new Enemy(this, (1 * 16), (1 * 16), 'demon'),
        )



        this.enemies.forEach((en) => {
            this.physics.add.collider(en, [boxes]);
            this.physics.add.overlap(en, this.player, () => {
                en.direction = null
                this.enemies.forEach((e) => e.destroy())
                this.player.dead = true
                this.bloodFade()
                
                this.music.stop();
                this.deathSound.play();
                let go = this.add.image(152, 176, 'gameover', 0)
                go.setDepth(8)
            });
        })

        // Audio
        this.music = this.sound.add('nightmare', {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        });

        this.deathSound = this.sound.add('death', {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        });

        this.music.play()

    }

    bloodFade () {
        if (this.bloodShader) {
            this.bloodShader.destroy()
        }
        const blood = new Blood()
        this.bloodShader = this.add.shader(blood, 304/2, 352/2, 304, 352)
        this.bloodShader.setDepth(6)
        this.timer = this.time.addEvent({
            delay: 5000,
            callback: () => {
                this.bloodShader.destroy()
                this.scene.start('Menu')
            },
            callbackScope: this,
            loop: false
        })
    }

    update () {
        this.controls.update()
        if (this.bloodShader) {
            this.bloodAnim += 1
            this.bloodShader.setUniform('dtime.value', this.bloodAnim)
        }
    }

}