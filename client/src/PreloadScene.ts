import {Scene} from "phaser";
import {user} from "./services/User";

export let isAssigned:boolean=false;
export default class PreloadScene extends Scene{
    constructor(){
        super('PreloadScene_Key');
    }
    preload(){
        this.load.image('mockup',require('./assets/mockup.png'));
        this.load.image('gift',require('./assets/gift.png'));
        this.load.spritesheet({
            key: 'human',
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
        this.add.image(0,0,"mockup").setOrigin(0,0);
        this.anims.create({
            key: 'stance',
            frames: this.anims.generateFrameNumbers('human', { frames: [ 0, 1, 2, 3] }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'running',
            frames: this.anims.generateFrameNumbers('human', { frames: [4, 5, 6, 7, 8, 9, 10, 11] }),
            frameRate: 9,
            repeat: -1
        });
        if(await user.join()){
            this.choosePlayer();
        }
    }
    choosePlayer(){
        let human_btn=document.getElementById("human-btn");
        let zombie_btn=document.getElementById("zombie-btn");
        human_btn?.addEventListener("click",()=>{
            user.room.send("Assign-Human");
            human_btn?.setAttribute("disabled","disabled");
            zombie_btn?.setAttribute("disabled","disabled");
            this.scene.start("GameScene_Key");
        })
        zombie_btn?.addEventListener("click",()=>{
            user.room.send("Assign-Zombie");
            human_btn?.setAttribute("disabled","disabled");
            zombie_btn?.setAttribute("disabled","disabled");
            this.scene.start("GameScene_Key");
        });
    }
    
}