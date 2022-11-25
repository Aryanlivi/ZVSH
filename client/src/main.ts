import Phaser from "phaser";
import PreloadScene from "./PreloadScene";
import SelectionScene from "./SelectionScene";
import GameScene from "./GameScene";
const config = {
    type: Phaser.AUTO,
    width: 1096,
    height: 616,
    scene: [PreloadScene,SelectionScene,GameScene]
};
const game = new Phaser.Game(config);