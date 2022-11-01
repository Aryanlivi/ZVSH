import Player from "./Player";
import Phaser from "phaser";
//------Human States:
export enum HumanState{
    l_stance=0,
    l_running
}
//------Constants:
const TEXTURE_KEY="human";

///
export default class Human extends Player{
    constructor(scene:Phaser.Scene,x:number,y:number,title:string,alive:boolean,id:string,state:HumanState){
        super(scene,x,y,TEXTURE_KEY,title,alive,id);
        this.state=state;
        this.walkSpeed=1.0;
    }
}
