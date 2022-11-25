import { Scene } from "phaser";
import { KEY } from "./Constants";
import { user } from "./services/User";

export default class SelectionScene extends Scene{
    constructor(){
        super(KEY.selectionScene);
    }
    preload(){
        console.log("In Selection Scene");
    }
    create(){
        this.add.image(0,0,KEY.mockup).setOrigin(0,0);
        this.choosePlayer();
    }
    choosePlayer(){
        const human_btn=document.getElementById("human-btn");
        const zombie_btn=document.getElementById("zombie-btn");
        human_btn?.addEventListener("click",()=>{
            user.room.send("Assign-Human");
            human_btn?.setAttribute("disabled","disabled");
            zombie_btn?.setAttribute("disabled","disabled");
            this.scene.start(KEY.gameScene);
        })
        zombie_btn?.addEventListener("click",()=>{
            user.room.send("Assign-Zombie");
            human_btn?.setAttribute("disabled","disabled");
            zombie_btn?.setAttribute("disabled","disabled");
            this.scene.start(KEY.gameScene);
        });
    }
}