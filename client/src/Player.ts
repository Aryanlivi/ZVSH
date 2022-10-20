
import { timeEnd } from "console";
import Phaser from "phaser";

export default class Player extends Phaser.GameObjects.Sprite{
    inScene:boolean;
    titleObj:Phaser.GameObjects.Text;
    title:string;
    alive:Boolean;
    id:string;
    healthBarTextureKey:string;
    healthBarObj:Phaser.GameObjects.Image;
    circle:Phaser.GameObjects.Graphics;
    constructor(scene,x:number,y:number,texture:string,title:string,alive:Boolean,id:string){
        super(scene,x,y,texture);
        this.inScene=false;
        this.title=title;
        this.alive=alive;
        this.id=id;
    }
    addToScene(): void{}
    removeFromScene(){};
    addcircle(){
        this.circle=this.scene.add.graphics();
        this.circle.lineStyle(2, 0xff0000,1);
        var radius = 2;
        const topCenter=this.getTopCenter();
        const offsetY=35;
        this.circle.strokeCircle(topCenter.x, topCenter.y+offsetY, radius);
    };
    addTitle(): void {
        const FONTFAMILY= 'Georgia, "Goudy Bookletter 1911", Times, serif';
        this.titleObj=this.scene.add.text(this.getTopCenter().x,this.getTopCenter().y,this.id, { fontFamily:FONTFAMILY }).setOrigin(0.5,0)
    }
    addHealthBar(){
        const topCenter=this.getTopCenter();
        const offsetY=35;
        this.healthBarObj=this.scene.add.image(topCenter.x,topCenter.y+offsetY,this.healthBarTextureKey);
    }
    destroyAll(){
        this.healthBarObj.destroy();
        this.titleObj.destroy();
        this.destroy();
    }
    //update(){}
}

