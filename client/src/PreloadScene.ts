/* eslint-disable @typescript-eslint/no-var-requires */
import {Scene} from "phaser";
import {user} from "./services/User";
import {KEY} from "./Constants"
export default class PreloadScene extends Scene{
    constructor(){
        super(KEY.preload);
    }
    preload(){
        this.load.image(KEY.mockup,require('./assets/mockup.png'));
        this.load.image(KEY.green_healthbar,require('./assets/zvh_healthBarHealthy.png'));
        this.load.image(KEY.red_healthbar,require('./assets/zvh_healthBarUnhealthy.png'));
        this.load.image(KEY.gift,require('./assets/gift.png'));
        this.load.spritesheet({
            key: KEY.human,
            url: require('./assets/human.png'),
            frameConfig: {
                frameWidth: 128,
                frameHeight: 128
            }
        });
    }
    async create(){
        
        console.log("Pre-Loading..")
        /*
            sprZombie.add("l_stance", [0, 1, 2, 3], 4, true);
			sprZombie.add("l_running", [4, 5, 6, 7, 8, 9, 10, 11], 9, true);
        */
        this.add.image(0,0,KEY.mockup).setOrigin(0,0);
        this.createAnims(); 
        if(await user.join()){
            this.choosePlayer();
        }
    }

    createAnims(){
        this.anims.create({
            key: KEY.stance,
            frames: this.anims.generateFrameNumbers(KEY.human, { frames: [ 0, 1, 2, 3] }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: KEY.running,
            frames: this.anims.generateFrameNumbers(KEY.human, { frames: [4, 5, 6, 7, 8, 9, 10, 11] }),
            frameRate: 9,
            repeat: -1
        });
    }
    
    choosePlayer(){
        const human_btn=document.getElementById("human-btn");
        const zombie_btn=document.getElementById("zombie-btn");
        human_btn?.addEventListener("click",()=>{
            user.room.send("Assign-Human");
            human_btn?.setAttribute("disabled","disabled");
            zombie_btn?.setAttribute("disabled","disabled");
            this.scene.start(KEY.gamescene);
        })
        zombie_btn?.addEventListener("click",()=>{
            user.room.send("Assign-Zombie");
            human_btn?.setAttribute("disabled","disabled");
            zombie_btn?.setAttribute("disabled","disabled");
            this.scene.start(KEY.gamescene);
        });
    }
    
}