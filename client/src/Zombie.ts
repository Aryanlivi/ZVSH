import Player from "./Player"
export default class Zombie extends Player{
    delX:number;
    delY:number;
    
    constructor(scene:Phaser.Scene,x:number,y:number,title:string,alive:boolean,id:string,state:HumanState){
        super(scene,x,y,TEXTURE_KEY,title,alive,id,state);
        this.state=state;
        this.walkSpeed=1.0;
    }
}