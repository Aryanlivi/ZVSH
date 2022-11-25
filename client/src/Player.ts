import Phaser from "phaser";
import { KEY } from "./Constants";
import {PlayerStates} from "./services/PlayerSchema"

export enum PlayerType{
    Human=0,
    Zombie
}
export function Distance(x1:number,y1:number,x2:number,y2:number){
    const DELX=x2-x1;
    const DELY=y2-y1;
    const X=Math.pow(DELX,2);
    const Y=Math.pow(DELY,2);
    const MAGNITUDE=Math.sqrt(X+Y)
    return {magnitude:MAGNITUDE,X:X,Y:Y,delX:DELX,delY:DELY};
}
export default class Player extends Phaser.GameObjects.Sprite{
    playerType:PlayerType;
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
    currAngle:number;
    facingIndex:number;
    oldFacingIndex:number;
    facingPrefix:Array<string>;
    constructor(scene,x:number,y:number,targetX:number,targetY:number,texture:string,title:string,alive:boolean,id:string,state:number){
        super(scene,x,y,texture);
        this.facingIndex=0;
        this.oldFacingIndex=0;
        this.facingPrefix=["l", "lu", "u", "ur", "r", "rd", "d", "dl"];
        this.inScene=false;
        this.state=state;
        this.title=title;
        this.alive=alive;
        this.id=id;
        this.animKey="stance"
        this.targetX=targetX;
        this.targetY=targetY;
    }
    addToScene(){
        this.inScene=true;
        this.addTitle();
        this.addHealthBar();
        this.setPlayerAnim(this.animKey);
        this.scene.add.existing(this);
    }
    //for testing purposes
    addcircle(){
        this.circle=this.scene.add.graphics();
        this.circle.lineStyle(2, 0xff0000,1);
        const RADIUS = 2;
        const CENTER=this.getCenter();
        //const OFFSET_Y=35;
        this.circle.strokeCircle(CENTER.x, CENTER.y, RADIUS);
        const line=this.scene.add.graphics();
        line.lineStyle(2,0x000000,1);
        const LINE_WIDTH=50;
        line.strokeRect(CENTER.x-LINE_WIDTH/2, CENTER.y,LINE_WIDTH,1);
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
    getCurrentAngle(angle:number){
        angle=angle*(180/Math.PI);
        if(angle<0){
            angle+=360
        }
        return angle;
    }
    setEntityAngle(ang:number){
        let currFacingIndex:number;
        currFacingIndex=0;
			
			if (ang < 22.5 || ang > 337.5)
			{ // right
				currFacingIndex = 4;
			}
			else if (ang > 22.5 && ang < 67.5)
			{ // right-down
				currFacingIndex = 5;
			}
			else if (ang > 67.5 && ang < 112.5)
			{ // down
				currFacingIndex = 6;
			}
			else if (ang > 112.5 && ang < 157.5)
			{ // left-down
				currFacingIndex = 7;
			}
			else if (ang > 157.5 && ang < 202.5)
			{ // left
				currFacingIndex = 0;
			}
			else if (ang > 202.5 && ang < 247.5)
			{ // left-up
				currFacingIndex = 1;
			}
			else if (ang > 247.5 && ang < 292.5)
			{ // up
				currFacingIndex = 2;
			}
			else if (ang > 292.5 && ang < 337.5)
			{ // right-up
				currFacingIndex = 3;
			}
			this.facingIndex = currFacingIndex;
    }
    getPlayerAnim(){
        switch(this.state){
            case PlayerStates.stand:
                return "stand";
            case PlayerStates.running:
                return "running";
            case PlayerStates.lurch:
                return "lurch";
            default:
                return "stand";
        }
    }
    setPlayerAnim(newanimKey:string){
        if (newanimKey == "attack")
			{
				newanimKey = "swing";
			}
        if(newanimKey!=this.animKey || this.oldFacingIndex!=this.facingIndex ){
            this.play(this.facingPrefix[this.facingIndex]+"_"+newanimKey,false);
            this.oldFacingIndex=this.facingIndex;
            this.animKey=newanimKey;
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

