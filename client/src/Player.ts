import Phaser from "phaser";
import { KEY } from "./Constants";
import { HumanState } from "./Human";
export function Distance(x1:number,y1:number,x2:number,y2:number){
    const DELX=x2-x1;
    const DELY=y2-y1;
    const X=Math.pow(DELX,2);
    const Y=Math.pow(DELY,2);
    const MAGNITUDE=Math.sqrt(X+Y)
    return {magnitude:MAGNITUDE,X:X,Y:Y,delX:DELX,delY:DELY};
}
export default class Player extends Phaser.GameObjects.Sprite{
    walkSpeed:number; 
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
    constructor(scene,x:number,y:number,targetX:number,targetY:number,texture:string,title:string,alive:boolean,id:string,state:number){
        super(scene,x,y,texture);
        this.inScene=false;
        this.state=state;
        this.title=title;
        this.alive=alive;
        this.id=id;
        this.setAnim();
        this.targetX=targetX;
        this.targetY=targetY;
    }
    addToScene(){
        this.inScene=true;
        this.addTitle();
        this.addHealthBar();
        this.play(this.animKey);
        this.scene.add.existing(this);
    }
    //for testing purposes
    addcircle(){
        this.circle=this.scene.add.graphics();
        this.circle.lineStyle(2, 0xff0000,1);
        const RADIUS = 2;
        const TOP_CENTER=this.getTopCenter();
        const OFFSET_Y=35;
        this.circle.strokeCircle(TOP_CENTER.x, TOP_CENTER.y+OFFSET_Y, RADIUS);
    }

    addTitle(): void {
        const FONTFAMILY= 'Georgia, "Goudy Bookletter 1911", Times, serif';
        this.titleObj=this.scene.add.text(this.getTopCenter().x,this.getTopCenter().y,this.id, { fontFamily:FONTFAMILY }).setOrigin(0.5,0)
    }

    addHealthBar(){
        const TOP_CENTER=this.getTopCenter();
        const OFFSET_Y=35;
        this.healthBarObj=this.scene.add.image(TOP_CENTER.x,TOP_CENTER.y+OFFSET_Y,this.healthBarTextureKey);
    }

    move(){
        return;
    }
    setAnim(){
        switch(this.state){
            case HumanState.stance:
                this.animKey=KEY.stance;
                break;
            case HumanState.running:
                this.animKey=KEY.running;
                break;
        }
    }
    playAnim(){
        if(this.state==HumanState.running && this.animKey!=KEY.running){
            console.log(this.id+" run")
            this.animKey=KEY.running;  
            this.play(this.animKey);
        }
        if(this.state==HumanState.stance && this.animKey!=KEY.stance){
            console.log(this.id+" stance")
            this.animKey=KEY.stance;
            this.play(this.animKey);
            this.update()
        }
    }
    remove(){
        this.healthBarObj.destroy();
        this.titleObj.destroy();
        this.destroy();
    }
    update(): void {
        return;
    }
}

