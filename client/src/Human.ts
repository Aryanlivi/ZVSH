import Player,{Distance} from "./Player";
import Phaser from "phaser";
import {user} from "./services/User";
import { KEY } from "./Constants";
import {PlayerStates} from "./services/PlayerSchema"
export class Human extends Player{

    constructor(scene:Phaser.Scene,x:number,y:number,targetX:number,targetY:number,title:string,alive:boolean,id:string,state:number){
        super(scene,x,y,targetX,targetY,KEY.human,title,alive,id,state);
        this.walkSpeed=1.8;
    }
/*
    static oldCreateAnims(scene:Phaser.Scene){
        scene.anims.create({
            key:"l_stand",
            frames: scene.anims.generateFrameNumbers(KEY.human, { frames: [ 0, 1, 2, 3] }),
            frameRate: 4,
            repeat: -1
        });
        scene.anims.create({
            key:"l_running",
            frames: scene.anims.generateFrameNumbers(KEY.human, { frames: [4, 5, 6, 7, 8, 9, 10, 11] }),
            frameRate: 9,
            repeat: -1
        });
        scene.anims.create({
            key:"l_swing",
            frames: scene.anims.generateFrameNumbers(KEY.human, { frames: [12, 13, 14, 15] }),
            frameRate: 9,
            repeat: -1
        });
        scene.anims.create({
            key:"l_block",
            frames: scene.anims.generateFrameNumbers(KEY.human, { frames: [16, 17] }),
            frameRate: 9,
            repeat: -1
        });
        scene.anims.create({
            key:"l_die",
            frames: scene.anims.generateFrameNumbers(KEY.human, { frames:[18, 19, 20, 21, 22, 23] }),
            frameRate: 9,
            repeat: 0
        });

        scene.anims.create({
            key:"l_crit",
            frames: scene.anims.generateFrameNumbers(KEY.human, { frames:[28, 29, 30, 31, 32, 33, 34, 31] }),
            frameRate: 9,
            repeat: -1
        });

        scene.anims.create({
            key:"lu_stand",
            frames: scene.anims.generateFrameNumbers(KEY.human, { frames:[32, 33, 34, 35] }),
            frameRate: 4,
            repeat: -1
        });
        scene.anims.create({
            key:"lu_running",
            frames: scene.anims.generateFrameNumbers(KEY.human, { frames:[36, 37, 38, 39, 40, 41, 42, 43] }),
            frameRate: 9,
            repeat: -1
        });
        scene.anims.create({
            key:"lu_swing",
            frames: scene.anims.generateFrameNumbers(KEY.human, { frames:[44, 45, 46, 47] }),
            frameRate: 9,
            repeat: -1
        });
        scene.anims.create({
            key:"lu_block",
            frames: scene.anims.generateFrameNumbers(KEY.human, { frames:[48, 49] }),
            frameRate: 9,
            repeat: -1
        });
        scene.anims.create({
            key:"lu_die",
            frames: scene.anims.generateFrameNumbers(KEY.human, { frames:[50, 51, 52, 53, 54, 55] }),
            frameRate: 9,
            repeat: 0
        });
        scene.anims.create({
            key:"lu_crit",
            frames: scene.anims.generateFrameNumbers(KEY.human, { frames: [64, 65, 66, 67, 68, 69, 70, 71] }),
            frameRate: 9,
            repeat: -1
        });
        scene.anims.create({
            key:"u_stand",
            frames: scene.anims.generateFrameNumbers(KEY.human, { frames:[64, 65, 66, 67] }),
            frameRate: 4,
            repeat: -1
        });
        scene.anims.create({
            key:"u_running",
            frames: scene.anims.generateFrameNumbers(KEY.human, { frames:[68, 69, 70, 71, 72, 73, 74, 75] }),
            frameRate: 9,
            repeat: -1
        });
        scene.anims.create({
            key:"u_swing",
            frames: scene.anims.generateFrameNumbers(KEY.human, { frames:[76, 77, 78, 79] }),
            frameRate: 9,
            repeat: -1
        });
        scene.anims.create({
            key:"u_block",
            frames: scene.anims.generateFrameNumbers(KEY.human, { frames:[80, 81] }),
            frameRate: 9,
            repeat: -1
        });
        scene.anims.create({
            key:"u_die",
            frames: scene.anims.generateFrameNumbers(KEY.human, { frames:[82, 83, 84, 85, 86, 87] }),
            frameRate: 9,
            repeat: 0
        });
        scene.anims.create({
            key:"u_crit",
            frames: scene.anims.generateFrameNumbers(KEY.human, { frames:[100, 101, 102, 103, 104, 105, 106, 107] }),
            frameRate: 9,
            repeat: -1
        });

        scene.anims.create({
            key:"ur_stand",
            frames: scene.anims.generateFrameNumbers(KEY.human, { frames:[96, 97, 98, 99] }),
            frameRate: 4,
            repeat: -1
        });

    }
*/

    static initAnims(scene:Phaser.Scene,key:string,frameArray:number[],frameRate:number,loop:boolean)
    {
        const textureKey=KEY.human;
        let repeatVal=0;
        if(loop){
            repeatVal=-1;
        }
        scene.anims.create({
            key:key,
            frames: scene.anims.generateFrameNumbers(textureKey, { frames: frameArray }),
            frameRate: frameRate,
            repeat: repeatVal
        });
    }
    static createAnims(scene:Phaser.Scene){
        
        this.initAnims(scene,"l_stance", [0, 1, 2, 3], 4, true);
        this.initAnims(scene,"l_running", [4, 5, 6, 7, 8, 9, 10, 11], 9, true);
        this.initAnims(scene,"l_swing", [12, 13, 14, 15], 9, true);
        this.initAnims(scene,"l_block", [16, 17], 9, true);
        this.initAnims(scene,"l_die", [18, 19, 20, 21, 22, 23], 9, false);
        this.initAnims(scene,"l_crit", [28, 29, 30, 31, 32, 33, 34, 31], 9, true);
        
        // left-up
        this.initAnims(scene,"lu_stand", [32, 33, 34, 35], 4, true);
        this.initAnims(scene,"lu_running", [36, 37, 38, 39, 40, 41, 42, 43], 9, true);
        this.initAnims(scene,"lu_swing", [44, 45, 46, 47], 9, true);
        this.initAnims(scene,"lu_block", [48, 49], 9, true);
        this.initAnims(scene,"lu_die", [50, 51, 52, 53, 54, 55], 9, false);
        this.initAnims(scene,"lu_crit", [64, 65, 66, 67, 68, 69, 70, 71], 9, true);
        
        // up
        this.initAnims(scene,"u_stand", [64, 65, 66, 67], 4, true);
        this.initAnims(scene,"u_running", [68, 69, 70, 71, 72, 73, 74, 75], 9, true);
        this.initAnims(scene,"u_swing", [76, 77, 78, 79], 9, true);
        this.initAnims(scene,"u_block", [80, 81], 9, true);
        this.initAnims(scene,"u_die", [82, 83, 84, 85, 86, 87], 9, false);
        this.initAnims(scene,"u_crit", [100, 101, 102, 103, 104, 105, 106, 107], 9, true);
        
        // right-up
        this.initAnims(scene,"ur_stand", [96, 97, 98, 99], 4, true);
        this.initAnims(scene,"ur_running", [100, 101, 102, 103, 104, 105, 106, 107], 9, true);
        this.initAnims(scene,"ur_swing", [108, 109, 110, 111], 9, true);
        this.initAnims(scene,"ur_block", [112, 113], 9, true);
        this.initAnims(scene,"ur_die", [114, 115, 116, 117, 118, 119], 9, false);
        this.initAnims(scene,"ur_crit", [136, 137, 138, 139, 140, 141, 142, 143], 9, true);
        
        // right
        this.initAnims(scene,"r_stand", [128, 129, 130, 131], 4, true);
        this.initAnims(scene,"r_running", [132, 133, 134, 135, 136, 137, 138, 139], 9, true);
        this.initAnims(scene,"r_swing", [140, 141, 142, 143], 9, true);
        this.initAnims(scene,"r_block", [144, 145], 9, true);
        this.initAnims(scene,"r_die", [146, 147, 148, 149, 150, 151], 9, false);
        this.initAnims(scene,"r_crit", [172, 173, 174, 175, 176, 177, 178, 179], 9, true);
        
        // right-down
        this.initAnims(scene,"rd_stand", [160, 161, 162, 163], 4, true);
        this.initAnims(scene,"rd_running", [164, 165, 166, 167, 168, 169, 170, 171], 9, true);
        this.initAnims(scene,"rd_swing", [172, 173, 174, 175], 9, true);
        this.initAnims(scene,"rd_block", [176, 177], 9, true);
        this.initAnims(scene,"rd_die", [178, 179, 180, 181, 182, 183], 9, false);
        this.initAnims(scene,"rd_crit", [208, 209, 210, 211, 212, 213, 214, 215], 9, true);
        
        // down
        this.initAnims(scene,"d_stand", [192, 193, 194, 195], 4, true);
        this.initAnims(scene,"d_running", [196, 197, 198, 199, 200, 201, 202, 203], 9, true);
        this.initAnims(scene,"d_swing", [204, 205, 206, 207], 9, true);
        this.initAnims(scene,"d_block", [208, 209], 9, true);
        this.initAnims(scene,"d_die", [210, 211, 212, 213, 214, 215], 9, false);
        this.initAnims(scene,"d_crit", [244, 245, 246, 247, 248, 249, 250, 251], 9, true);
        
        // left-down
        this.initAnims(scene,"dl_stand", [224, 225, 226, 227], 4, true);
        this.initAnims(scene,"dl_running", [228, 229, 230, 231, 232, 233, 234, 235], 9, true);
        this.initAnims(scene,"dl_swing", [236, 237, 238, 239], 9, true);
        this.initAnims(scene,"dl_block", [240, 241], 9, true);
        this.initAnims(scene,"dl_die", [274, 275, 276, 277, 278, 279], 9, false);
        this.initAnims(scene,"dl_crit", [280, 281, 282, 283, 284, 285, 286, 287], 9, true);
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
            this.state=PlayerStates.running;
            user.room.send("Change-State",{id:this.id,state:this.state});
            this.setPlayerAnim("running");
        }
        if(DISTANCE.magnitude<2 && this.state!=PlayerStates.stance){
            this.state=PlayerStates.stance;
            this.setPlayerAnim("stance");
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
