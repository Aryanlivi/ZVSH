
import { timeEnd } from "console";
import Phaser from "phaser";

export default class Player extends Phaser.GameObjects.Sprite{
    inScene:boolean;
    titleObj:Phaser.GameObjects.Text;
    title:string;
    alive:Boolean;
    id:string;
    circle:Phaser.GameObjects.Graphics;
    constructor(scene,x:number,y:number,texture:string,title:string,alive:Boolean,id:string){
        super(scene,x,y,texture);
        this.inScene=false;
        this.title=title;
        this.alive=alive;
        this.id=id;
        this.circle=scene.add.graphics();
    }
    addToScene(): void{}
    removeFromScene(){};
    addcircle(){};
    addTitle(): void {
        const FONTFAMILY= 'Georgia, "Goudy Bookletter 1911", Times, serif';
        this.titleObj=this.scene.add.text(this.getTopCenter().x,this.getTopCenter().y,this.id, { fontFamily:FONTFAMILY }).setOrigin(0.5,0)
    }
    //update(){}
}

