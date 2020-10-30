import './style.css';
import Phaser from 'phaser';
import Loading from './scenes/Loading'
import SceneA from './scenes/SceneA'
import Menu from './scenes/Menu'

const config = {
    width: 608,
    height: 704,
    type: Phaser.WEBGL,
    pixelArt: true,
    parent: 'render',
    scene: [Loading, Menu, SceneA],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    }
};
new Phaser.Game(config);