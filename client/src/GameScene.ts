import  Human, { HumanState }  from "./Human";
import {Scene} from "phaser";
import {user} from "./services/User";
import Player from "./Player";
//import Zombie  from "./Zombie";
import {MapSchema } from "@colyseus/schema";
//let tempid:string="";
type ChangeObj={
    x:number,
    y:number,
    title:string,
    id:string,
    alive:boolean,
    state:number
};
const updates:ChangeObj={
    x:0,
    y:0,
    title:"",
    id:"",
    alive:true,
    state:0
};
export default class GameScene extends Scene{
    player:Player;
    id:string;
    listOfPlayers:Map<string,Player>=new Map();
    listOfUpdates:Map<string,ChangeObj>=new Map();
    constructor(){
        super('GameScene_Key');
    }

    preload(){ console.log("gamescene") } 
    
    create ()
    {
        this.initMockup();
        
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
                        
                        if(change.field=="state"){
                            updates.state=change.value;
                        }
                    
                    })
                    this.findDirection();
                }
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
            })
            
        }
//-----Sync Player----//

this.listOfPlayers.forEach((e)=>{
    if(e.state==HumanState.l_running){  
        e.move(delta);
        e.healthBarObj.destroy();
        e.addHealthBar();
        e.titleObj.destroy();
        e.addTitle();
        e.playAnim();
    }
})
this.syncPlayer(delta);
//--------------------------------------------------------------------//
    players.onRemove=(item,key)=>{
            // ! at the end helps in removing null or undefined
            const player:Player=this.listOfPlayers.get(item.id)!;
            this.listOfPlayers.delete(item.id);
            player.remove();
            console.log(player+"Removed");
        }
    }

    syncPlayer(delta:number){
        if(this.listOfPlayers.has(updates.id)){
            const player=this.listOfPlayers.get(updates.id)!;
            player.id=updates.id;
            player.targetX=updates.x;
            player.targetY=updates.y;
            player.state=updates.state;
            player.title=updates.title;
            player.alive=updates.alive;
            /*
            //destroy old healthBarObj to be replaced by new
            player.healthBarObj.destroy();
            player.addHealthBar();
            //destroy old titleObj to be replaced by new
            player.titleObj.destroy();
            player.addTitle();
            */
            //player.move(delta,updates.x,updates.y);
            //this.handleAnim(player);
        }   
    }
    movePlayer(player:Player,delta:number){
        /*
        const delX = updates.x-player.x;
        const delY = updates.y-player.y;
        if(delX==0 && delY==0){
            player.x = player.x + Math.cos(Math.PI/2) * player.walkSpeed;
            player.y = player.y + Math.sin(0) * player.walkSpeed;
        }
        else{
            const rotation:number=Math.atan2(delY, delX);
            player.x = player.x + Math.cos(rotation) * player.walkSpeed;
            player.y = player.y + Math.sin(rotation) * player.walkSpeed;
        }
        const diffX = Math.abs(delX);
        const diffY = Math.abs(delY);
        if(diffX<1 && diffY<1 && player.state!=HumanState.l_stance){
            player.state=HumanState.l_stance;
            const temp=user.room.state.players.get(player.id);
            temp.state=HumanState.l_stance;
            updates.state=temp.state;
            console.log(temp);
        }
        */
        //player.x=Phaser.Math.Linear(player.x,updates.x,0.001*delta);
        //player.y=Phaser.Math.Linear(player.y,updates.y,0.001*delta);
    }
    findDirection(){
        const player=this.listOfPlayers.get(updates.id)!;
        if(updates.x>player.x){
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
 

    update(time: number, delta: number): void {
        this.handleChanges(delta);
    }
}