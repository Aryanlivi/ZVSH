import Player from "./Player";
import Phaser,{Scene} from "phaser";
import GameScene from "./GameScene";
import { stat } from "fs";
import { Grid } from "matter";

//------Human States:
export enum HumanState{
    l_stance=0,
    l_running
}
//------Constants:
const TEXTURE_KEY="human";

///
export default class Human extends Player{
    private static readonly walkSpeed:number=1.0; 
    state:HumanState;
    constructor(scene:Phaser.Scene,x:number,y:number,title:string,alive:Boolean,id:string,state:HumanState){
        super(scene,x,y,TEXTURE_KEY,title,alive,id);
        this.state=state;
    }
    addToScene(){
        this.inScene=true;
        this.addTitle();
        this.scene.add.existing(this);
        this.play("running");
        console.log("Human added to scene!");
    }
    addcircle(){
        this.circle=this.scene.add.graphics();
        this.circle.lineStyle(2, 0xff0000,1);
        var radius = 2;
        const topCenter=this.getTopCenter();
        const offsetY=35;
        this.circle.strokeCircle(topCenter.x, topCenter.y+offsetY, radius);
    }
    removeFromScene(){
        this.destroy();
    }
    update(x:number,y:number,alive:Boolean,state:HumanState){
        this.x=x;
        this.y=y;
        this.alive=alive;
        this.state=state;
        console.log(this.title);
    }
}
