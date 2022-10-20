import  Human  from "./Human";
import {Scene} from "phaser";
import {user} from "./services/User";
import Player from "./Player";
import Zombie  from "./Zombie";
import {MapSchema } from "@colyseus/schema";
import { ChangeOperation } from "@colyseus/schema/lib/changes/ChangeTree";


//let tempid:string="";
type ChangeObj={
    x:number,
    y:number,
    title:string,
    id:string,
    alive:boolean
};
let updates:ChangeObj={
    x:0,
    y:0,
    title:"",
    id:"",
    alive:true
};
export default class GameScene extends Scene{
    player:Player;
    id:string;
    listOfPlayers:Map<string,Player>=new Map();
    constructor(){
        super('GameScene_Key');
    }

    preload(){ console.log("gamescene") } 
    
    create ()
    {
        this.initMockup();
        
    }
    update(time: number, delta: number): void {
        this.handleChanges(delta);
    }
    initMockup(){
        const mockup=this.add.image(0,0,'mockup').setOrigin(0,0);
        mockup.setInteractive();
        mockup.on("pointerdown",(pointer)=>{
            if(pointer.leftButtonDown()){
                const mouseclick={
                    x:this.game.input.mousePointer.x,
                    y:this.game.input.mousePointer.y
                }
                //console.log("X:"+mouseclick.x+"\t Y:"+mouseclick.y);
                user.room.send("Pointer-Down",mouseclick);  
            }
        })
    }
    
    handleChanges(delta:number)
    { 
        const players:MapSchema=user.room.state.players;
        players.onAdd=(item,key)=>{

            //Sync players<MapSchema> to listofPlayers
            players.forEach((e,key)=>{
                const human=new Human(this,e.x,e.y,e.title,e.alive,e.id,e.state);
                if(!this.listOfPlayers.has(e.id))   
                {
                    this.listOfPlayers.set(e.id,human);
                }
                ////////////
                e.onChange=(changes)=>{
                    changes.forEach((change)=>{
                        updates.id=e.id;
                        if(change.field=="alive"){
                            updates.alive=change.value;
                        }
                        if(change.field=="title"){
                            updates.title=change.value;
                        }
                        
                        if(change.field=="id"){
                            updates.id=change.value;
                        }
                        
                        if(change.field=="x"){
                            updates.x=change.value;
                        }
                        
                        if(change.field=="y"){
                            updates.y=change.value;
                        }
                    })
                    this.findDirection();
                }
            })
            this.listOfPlayers.forEach((e)=>{
                if(!e.inScene){
                    if(e.id==user.id){
                        e.healthBarTextureKey='green_healthbar';
                    }
                    else{
                        e.healthBarTextureKey='red_healthbar'
                    }
                    e.addToScene();
                } 
            })
        }
        this.movePlayer(delta);

        ////////////////////
        players.onRemove=(item,key)=>{
            // ! at the end helps in removing null or undefined
            const player:Player=this.listOfPlayers.get(item.id)!;
            this.listOfPlayers.delete(item.id);
            player.destroyAll();
            console.log(player+"Removed");
        }
    }

    movePlayer(delta:number){
        if(this.listOfPlayers.has(updates.id)){
            const player=this.listOfPlayers.get(updates.id)!;
            player.id=updates.id;
            const step=0.004;
            player.x=Phaser.Math.Linear(player.x,updates.x,step*delta);
            player.y=Phaser.Math.Linear(player.y,updates.y,step*delta);
            player.title=updates.title;
            player.alive=updates.alive;
            player.healthBarObj.destroy();
            player.addHealthBar();
            player.titleObj.destroy();
            player.addTitle();
        }   
    }
    
    findDirection(){
        const player=this.listOfPlayers.get(updates.id)!;
        if(updates.x>player.x){
            console.log("Right"+"newx:"+updates.x+"\t oldx:"+player.x);
            if(updates.y>player.y){
                console.log("Right Down");
            }
            if(updates.y<player.y){
                console.log("Right Up");
            }
        }
        if(updates.x<player.x){
            console.log("Left");
            if(updates.y>player.y){
                console.log("Left Down");
            }
            if(updates.y<player.y){
                console.log("Left Up");
            }
        }
        if(updates.y>player.y){
            console.log("Down");
        }
        if(updates.y<player.y){
            console.log("Up");
        }
    }
}