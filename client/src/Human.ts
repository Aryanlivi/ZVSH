import Player from "./Player";
import Phaser from "phaser";
import {user} from "./services/User";
//------Human States:
export enum HumanState{
    l_stance=0,
    l_running
}
//------Constants:
const TEXTURE_KEY="human";

///
export default class Human extends Player{
    delX:number;
    delY:number;
    
    constructor(scene:Phaser.Scene,x:number,y:number,title:string,alive:boolean,id:string,state:HumanState){
        super(scene,x,y,TEXTURE_KEY,title,alive,id,state);
        this.state=state;
        console.log("initial:"+state)
        this.walkSpeed=1.0;
    }

    move(){
        ///console.log(this.id+"asked to move");
        this.delX = this.targetX-this.x;
        this.delY = this.targetY-this.y;
        const diffX = Math.abs(this.delX);
        const diffY = Math.abs(this.delY);
        if(this.delX==0 && this.delY==0){
            this.x = this.x + Math.cos(Math.PI/2) * this.walkSpeed;
            this.y = this.y + Math.sin(0) * this.walkSpeed;
            return;
        }
        else{
            const rotation:number=Math.atan2(this.delY, this.delX);
            this.x = this.x + Math.cos(rotation) * this.walkSpeed;
            this.y = this.y + Math.sin(rotation) * this.walkSpeed;
        }
        if(diffX<1 && diffY<1 && this.state!=HumanState.l_stance){
            this.state=HumanState.l_stance;
            console.log(this.id+"changed its state");
            user.room.send("Change-State",{id:this.id,state:this.state});
        }
        this.healthBarObj.destroy();
        this.addHealthBar();
        this.titleObj.destroy();
        this.addTitle();
        this.playAnim();
    }
}
