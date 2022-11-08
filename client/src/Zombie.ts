import Player,{Distance} from "./Player";
import { user } from "./services/User";
import { KEY,ZombieState} from "./Constants";

export class Zombie extends Player{
    constructor(scene:Phaser.Scene,x:number,y:number,targetX:number,targetY:number,title:string,alive:boolean,id:string,state:number){
        super(scene,x,y,targetX,targetY,KEY.zombie,title,alive,id,state);
        this.walkSpeed=1.8;
    }
    move(){
        const DISTANCE=Distance(this.x,this.y,this.targetX,this.targetY);
        if(DISTANCE.magnitude>=2){
            const rotation:number=Math.atan2(DISTANCE.delY,DISTANCE.delX);
            this.x = this.x + Math.cos(rotation) * this.walkSpeed;
            this.y = this.y + Math.sin(rotation) * this.walkSpeed;
            user.room.send("Update-Pos",{id:this.id,x:this.x,y:this.y});
            this.state=ZombieState.lurch;

        }
        if(DISTANCE.magnitude<2 && this.state!=ZombieState.stance){
            this.state=ZombieState.stance;
            //console.log(this.id+" changed its state");
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