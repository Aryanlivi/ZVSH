import {KEY} from "./Constants";
import { user } from "./services/User";

export class Gift extends Phaser.GameObjects.Sprite{
    isActive:boolean;
    constructor(scene:Phaser.Scene){
        super(scene,0,0,KEY.gift);
        this.isActive=false;
    }
    addToScene(){
        this.generateSpawnPoint();
        this.isActive=true;
        user.room.send("Gift-Added",{isActive:this.isActive,x:this.x,y:this.y});
        this.scene.add.existing(this);
    }
    generateSpawnPoint(){
        this.setRandomPosition();
        //console.log("X:"+this.x+"\t"+"Y:"+this.y);
    }
}