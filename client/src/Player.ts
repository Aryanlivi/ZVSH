
import { timeEnd } from "console";
import Phaser from "phaser";

export default class Player extends Phaser.GameObjects.Sprite{
    titleObj:Phaser.GameObjects.Text;
    title:string;
    alive:Boolean;
    id:string;
    circle:Phaser.GameObjects.Graphics;
    constructor(scene,x:number,y:number,texture:string,title:string,alive:Boolean,id:string){
        super(scene,x,y,texture);
        this.title=title;
        this.alive=alive;
        this.id=id;
        this.circle=scene.add.graphics();
    }    
    addTitle(){
        this.titleObj=this.scene.add.text(this.getTopCenter().x,this.getTopCenter().y,this.id, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' }).setOrigin(0.5,0)
    }
    addToScene(): void{}
    removeFromScene(){};
    addcircle(){};
    //update(){}
}

