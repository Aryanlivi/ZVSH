import Phaser from "phaser";
import { HumanState } from "./Human";

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
    targetX:number;
    targetY:number;
    constructor(scene,x:number,y:number,texture:string,title:string,alive:boolean,id:string){
        super(scene,x,y,texture);
        this.inScene=false;
        this.title=title;
        this.alive=alive;
        this.id=id;
        this.animKey="stance";
        this.targetX=this.x;
        this.targetY=this.y;
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
    move(delta:number){
        console.log(this.id+"asked to move");
        const delX = this.targetX-this.x;
        const delY = this.targetY-this.y;
        const diffX = Math.abs(delX);
        const diffY = Math.abs(delY);
        if(delX==0 && delY==0){
            console.log("asd")
            this.x = this.x + Math.cos(Math.PI/2) * this.walkSpeed;
            this.y = this.y + Math.sin(0) * this.walkSpeed;
        }
        else{
            const rotation:number=Math.atan2(delY, delX);
            this.x = this.x + Math.cos(rotation) * this.walkSpeed;
            this.y = this.y + Math.sin(rotation) * this.walkSpeed;
        }
        if(diffX<1 && diffY<1 && this.state!=HumanState.l_stance){
            this.state=HumanState.l_stance;
        }
    }
    playAnim(){
        if(this.state==HumanState.l_running && this.animKey!="running"){
            this.animKey="running";  
            this.play(this.animKey);
        }
        if(this.state==HumanState.l_stance && this.animKey!="stance"){
            this.animKey="stance";
            this.play(this.animKey);
        }
    }
    remove(){
        this.healthBarObj.destroy();
        this.titleObj.destroy();
        this.destroy();
    }
}

