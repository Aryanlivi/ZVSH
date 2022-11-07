import Player,{Distance} from "./Player";
import Phaser from "phaser";
import {user} from "./services/User";
import { KEY } from "./Constants";

export enum HumanState{
    stance=0,
    running
}

///
export default class Human extends Player{

    constructor(scene:Phaser.Scene,x:number,y:number,targetX:number,targetY:number,title:string,alive:boolean,id:string,state:number){
        super(scene,x,y,targetX,targetY,KEY.human,title,alive,id,state);
        this.walkSpeed=1.8;
    }

    move(){
        const DISTANCE=Distance(this.x,this.y,this.targetX,this.targetY);
        if(DISTANCE.magnitude>=2){
            const rotation:number=Math.atan2(DISTANCE.delY,DISTANCE.delX);
            this.x = this.x + Math.cos(rotation) * this.walkSpeed;
            this.y = this.y + Math.sin(rotation) * this.walkSpeed;
            user.room.send("Update-Pos",{id:this.id,x:this.x,y:this.y});
            this.state=HumanState.running;

        }
        if(DISTANCE.magnitude<2 && this.state!=HumanState.stance){
            this.state=HumanState.stance;
            console.log(this.id+" changed its state");
            user.room.send("Change-State",{id:this.id,state:this.state});
        }
    }
    update(){
        this.move();
        //replace with new healthbar as u move
        this.healthBarObj.destroy();
        this.addHealthBar();
        this.titleObj.destroy();
        this.addTitle();
        this.playAnim();
    }
}
