
import { timeEnd } from "console";
import Phaser from "phaser";

export default class Player extends Phaser.GameObjects.Sprite{
    title:string;
    alive:Boolean;
    id:string;
    constructor(scene,x:number,y:number,texture:string,title:string,alive:Boolean,id:string){
        super(scene,x,y,texture);
        this.title=title;
        this.alive=alive;
        this.id=id;
    }    
    addToScene(): void{}
    removeFromScene(){};
    //update(){}
}

