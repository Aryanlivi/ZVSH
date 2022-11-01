import Phaser from "phaser";

export default class Player extends Phaser.GameObjects.Sprite{
    walkSpeed:number; 
    state:number;
    inScene:boolean;
    titleObj:Phaser.GameObjects.Text;
    title:string;
    alive:boolean;
    id:string;
    animKey:string;
    healthBarTextureKey:string;
    healthBarObj:Phaser.GameObjects.Image;
    circle:Phaser.GameObjects.Graphics;
    constructor(scene,x:number,y:number,texture:string,title:string,alive:boolean,id:string){
        super(scene,x,y,texture);
        this.inScene=false;
        this.title=title;
        this.alive=alive;
        this.id=id;
        this.animKey="stance";
    }
    addToScene(){
        this.inScene=true;
        this.addTitle();
        this.addHealthBar();
        this.play(this.animKey);
        this.scene.add.existing(this);
    }
    addcircle(){
        this.circle=this.scene.add.graphics();
        this.circle.lineStyle(2, 0xff0000,1);
        const radius = 2;
        const topCenter=this.getTopCenter();
        const offsetY=35;
        this.circle.strokeCircle(topCenter.x, topCenter.y+offsetY, radius);
    }
    addTitle(): void {
        const FONTFAMILY= 'Georgia, "Goudy Bookletter 1911", Times, serif';
        this.titleObj=this.scene.add.text(this.getTopCenter().x,this.getTopCenter().y,this.id, { fontFamily:FONTFAMILY }).setOrigin(0.5,0)
    }
    addHealthBar(){
        const topCenter=this.getTopCenter();
        const offsetY=35;
        this.healthBarObj=this.scene.add.image(topCenter.x,topCenter.y+offsetY,this.healthBarTextureKey);
    }
    playAnim(){
        this.play(this.animKey);
    }
    remove(){
        this.healthBarObj.destroy();
        this.titleObj.destroy();
        this.destroy();
    }
}

