/* eslint-disable @typescript-eslint/no-var-requires */
import {Scene} from "phaser";
import {user} from "./services/User";
import {KEY} from "./Constants"
import { Human } from "./Human";
import { Zombie } from "./Zombie";

export default class PreloadScene extends Scene{
    constructor(){
        super(KEY.preload);
    }
    preload(){
        console.log("In Preload Scene");
        this.load.image(KEY.mockup,require('./assets/mockup.png'));
        this.load.image(KEY.green_healthbar,require('./assets/zvh_healthBarHealthy.png'));
        this.load.image(KEY.red_healthbar,require('./assets/zvh_healthBarUnhealthy.png'));
        this.load.image(KEY.mag_glass,require('./assets/magnifying-glass.png'))
        this.load.image(KEY.gift,require('./assets/gift.png'));
        this.load.spritesheet({
            key: KEY.human,
            url: require('./assets/human.png'),
            frameConfig: {
                frameWidth: 128,
                frameHeight: 128
            }
        });
        this.load.spritesheet({
            key: KEY.zombie,
            url: require('./assets/zombie.png'),
            frameConfig: {
                frameWidth: 128,
                frameHeight: 128
            }
        });
    }
    async create(){
        this.add.image(0,0,KEY.mockup).setOrigin(0,0);
        this.createAnims()
        if(await user.join()){
            this.scene.start(KEY.selectionScene);
        }
    }

    createAnims(){
        Human.createAnims(this);
        Zombie.createAnims(this);
    }
    
    
}