import Phaser from "phaser";
import GameScene from "./GameScene";
import PreloadScene from "./PreloadScene";

var config = {
    type: Phaser.AUTO,
    width: 1096,
    height: 616,
    scene: [PreloadScene,GameScene]
};
var game = new Phaser.Game(config);