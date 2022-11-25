import Player,{Distance} from "./Player";
import { user } from "./services/User";
import { KEY} from "./Constants";
import {PlayerStates,PlayerType} from "./services/PlayerSchema"

export class Zombie extends Player{
    constructor(scene:Phaser.Scene,x:number,y:number,targetX:number,targetY:number,title:string,alive:boolean,id:string,state:number){
        super(scene,x,y,targetX,targetY,KEY.zombie,title,alive,id,state);
        this.walkSpeed=1.8;
        this.playerType=PlayerType.Zombie;
    }
    static initAnims(scene:Phaser.Scene,key:string,frameArray:number[],frameRate:number,loop:boolean)
    {
        const textureKey=KEY.zombie;
        let repeatVal=0;
        if(loop){
            repeatVal=-1;
        }
        scene.anims.create({
            key:key+PlayerType.Zombie,
            frames: scene.anims.generateFrameNumbers(textureKey, { frames: frameArray }),
            frameRate: frameRate,
            repeat: repeatVal
        });
    }
    static createAnims(scene:Phaser.Scene){
        this.initAnims(scene,"l_stand", [0, 1, 2, 3], 4, true);
        this.initAnims(scene,"l_lurch", [4, 5, 6, 7, 8, 9, 10, 11], 9, true);
        this.initAnims(scene,"l_slam", [12, 13, 14, 15], 9, true);
        this.initAnims(scene,"l_bite", [16, 17, 18, 19], 9, true);
        this.initAnims(scene,"l_block", [20, 21], 9, true);
        this.initAnims(scene,"l_die", [22, 23, 24, 25, 26, 27], 9, false);
        this.initAnims(scene,"l_crit", [28, 29, 30, 31, 32, 33, 34, 35], 9, false);
        
        // left-up
        this.initAnims(scene,"lu_stand", [36, 37, 38, 39], 4, true);
        this.initAnims(scene,"lu_lurch", [40, 41, 42, 43, 44, 45, 46, 47], 9, true);
        this.initAnims(scene,"lu_slam", [48, 49, 50, 51], 9, true);
        this.initAnims(scene,"lu_bite", [52, 53, 54, 55], 9, true);
        this.initAnims(scene,"lu_block", [56, 57], 9, true);
        this.initAnims(scene,"lu_die", [58, 59, 60, 61, 62, 63], 9, false);
        this.initAnims(scene,"lu_crit", [64, 65, 66, 67, 68, 69, 70, 71], 9, false);
        
        // up
        this.initAnims(scene,"u_stand", [72, 73, 74, 75], 4, true);
        this.initAnims(scene,"u_lurch", [76, 77, 78, 79, 80, 81, 82, 83], 9, true);
        this.initAnims(scene,"u_slam", [84, 85, 86, 87], 9, true);
        this.initAnims(scene,"u_bite", [88, 89, 90, 91], 9, true);
        this.initAnims(scene,"u_block", [92, 93], 9, true);
        this.initAnims(scene,"u_die", [94, 95, 96, 97, 98, 99], 9, false);
        this.initAnims(scene,"u_crit", [100, 101, 102, 103, 104, 105, 106, 107], 9, false);
        
        // right-up
        this.initAnims(scene,"ur_stand", [108, 109, 110, 111], 4, true);
        this.initAnims(scene,"ur_lurch", [112, 113, 114, 115, 116, 117, 118, 119], 9, true);
        this.initAnims(scene,"ur_slam", [120, 121, 122, 123], 9, true);
        this.initAnims(scene,"ur_bite", [124, 125, 126, 127], 9, true);
        this.initAnims(scene,"ur_block", [128, 129], 9, true);
        this.initAnims(scene,"ur_die", [130, 131, 132, 133, 134, 135], 9, false);
        this.initAnims(scene,"ur_crit", [136, 137, 138, 139, 140, 141, 142, 143], 9, false);
        
        // right
        this.initAnims(scene,"r_stand", [144, 145, 146, 147], 4, true);
        this.initAnims(scene,"r_lurch", [148, 149, 150, 151, 152, 153, 154, 155], 9, true);
        this.initAnims(scene,"r_slam", [156, 157, 158, 159], 9, true);
        this.initAnims(scene,"r_bite", [160, 161, 162, 163], 9, true);
        this.initAnims(scene,"r_block", [164, 165], 9, true);
        this.initAnims(scene,"r_die", [166, 167, 168, 169, 170, 171], 9, false);
        this.initAnims(scene,"r_crit", [172, 173, 174, 175, 176, 177, 178, 179], 9, false);
        
        // right-down
        this.initAnims(scene,"rd_stand", [180, 181, 182, 183], 4, true);
        this.initAnims(scene,"rd_lurch", [184, 185, 186, 187, 188, 189, 190, 191], 9, true);
        this.initAnims(scene,"rd_slam", [192, 193, 194, 195], 9, true);
        this.initAnims(scene,"rd_bite", [196, 197, 198, 199], 9, true);
        this.initAnims(scene,"rd_block", [200, 201], 9, true);
        this.initAnims(scene,"rd_die", [202, 203, 204, 205, 206, 207], 9, false);
        this.initAnims(scene,"rd_crit", [208, 209, 210, 211, 212, 213, 214, 215], 9, false);
        
        // down
        this.initAnims(scene,"d_stand", [216, 217, 218, 219], 4, true);
        this.initAnims(scene,"d_lurch", [220, 221, 222, 223, 224, 225, 226, 227], 9, true);
        this.initAnims(scene,"d_slam", [228, 229, 230, 231], 9, true);
        this.initAnims(scene,"d_bite", [232, 233, 234, 235], 9, true);
        this.initAnims(scene,"d_block", [236, 237], 9, true);
        this.initAnims(scene,"d_die", [238, 239, 240, 241, 242, 243], 9, false);
        this.initAnims(scene,"d_crit", [244, 245, 246, 247, 248, 249, 250, 251], 9, false);
        
        // left-down
        this.initAnims(scene,"dl_stand", [252, 253, 254, 255], 4, true);
        this.initAnims(scene,"dl_lurch", [256, 257, 258, 259, 260, 261, 262, 263], 9, true);
        this.initAnims(scene,"dl_slam", [264, 265, 266, 267], 9, true);
        this.initAnims(scene,"dl_bite", [268, 269, 270, 271], 9, true);
        this.initAnims(scene,"dl_block", [272, 273], 9, true);
        this.initAnims(scene,"dl_die", [274, 275, 276, 277, 278, 279], 9, false);
        this.initAnims(scene,"dl_crit", [280, 281, 282, 283, 284, 285, 286, 287], 9, false);
    }

    move(){
        const DISTANCE=Distance(this.x,this.y,this.targetX,this.targetY);
        this.setEntityAngle(this.getCurrentAngle(this.currAngle));
        if(DISTANCE.magnitude>=2){
            const rotation:number=Math.atan2(DISTANCE.delY,DISTANCE.delX);
            this.currAngle=rotation;
            this.x = this.x + Math.cos(rotation) * this.walkSpeed;
            this.y = this.y + Math.sin(rotation) * this.walkSpeed;
            user.room.send("Update-Pos",{id:this.id,x:this.x,y:this.y});
            this.state=PlayerStates.lurch;
            user.room.send("Change-State",{id:this.id,state:this.state});
            this.setPlayerAnim("lurch"+this.playerType);
        }
        if(DISTANCE.magnitude<2 && this.state!=PlayerStates.stand){
            this.state=PlayerStates.stand;
            this.setPlayerAnim("stand"+this.playerType);
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
    }
}