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

    constructor(scene:Phaser.Scene,x:number,y:number,targetX:number,targetY:number,title:string,alive:boolean,id:string,state:HumanState){
        super(scene,x,y,targetX,targetY,TEXTURE_KEY,title,alive,id,state);
        this.state=state;
        this.walkSpeed=1.8;
    }

    move(){
        //onclick event state wouldve been changed from the server's command.
        const delX = this.targetX-this.x;
        const delY = this.targetY-this.y;
        const diffX = Math.abs(delX);
        const diffY = Math.abs(delY);
        //console.log(this.id+"has state:"+this.state+"and animKey"+this.animKey);
        if(delX==0 && delY==0 || this.state==HumanState.l_stance){
            this.x = this.x + Math.cos(Math.PI/2) * this.walkSpeed;
            this.y = this.y + Math.sin(0) * this.walkSpeed;
            return;
        }
        else{
            const rotation:number=Math.atan2(delY,delX);
            this.x = this.x + Math.cos(rotation) * this.walkSpeed;
            this.y = this.y + Math.sin(rotation) * this.walkSpeed;
            user.room.send("Update-Pos",{id:this.id,x:this.x,y:this.y});
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
