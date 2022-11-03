import  Human, { HumanState }  from "./Human";
import {Scene} from "phaser";
import {user} from "./services/User";
import Player from "./Player";
import PlayerSchema from "../../server//src/PlayerSchema"
//import Zombie  from "./Zombie";
import {MapSchema} from "@colyseus/schema";

//---->Main Game Scene----//
export default class GameScene extends Scene{
    //Data Members:
    private player:Player;
    private id:string;
    private listOfPlayers:Map<string,Player>=new Map();
    constructor(){
        //super takes in a key as arg to identify scene!
        super('GameScene_Key');
    }
    //---->Phaser Preload----//
    preload(){ console.log("gamescene") } 
    //---->Phaser Create----//
    create ()
    {
        this.initMockup();
        
    }

    //---->initializes Mockup----//
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

//###------>Functions involving Player//

    //---->handles player updates----//
    changePlayerData(player:PlayerSchema){
        player.onChange=(changes)=>{
            changes.forEach((change)=>{
                const playerToUpdate=this.listOfPlayers.get(player.id)!;
                switch(change.field){
                    case "alive":
                        playerToUpdate.alive=change.value;
                        break;
                    case "title":
                        playerToUpdate.title=change.value;
                        break;
                    case "id":
                        playerToUpdate.id=change.value;
                        break;
                    case "x":
                        playerToUpdate.targetX=change.value;
                        break;
                    case "y":
                        playerToUpdate.targetY=change.value;
                        break;
                    case "state":
                        playerToUpdate.state=change.value;
                        console.log(playerToUpdate.id+":"+playerToUpdate.state);
                        break;
                }
            })
        }
    }

    //---->Add Players to list and scene----//
    addPlayers(id:string,player:Player){
        //Sync players<MapSchema> to listofPlayers
        if(!this.listOfPlayers.has(id))   
        {
            this.listOfPlayers.set(id,player);
        }

        //-->Adds to Scene
        this.listOfPlayers.forEach((player)=>{
            if(!player.inScene){
                if(player.id==user.id){
                    player.healthBarTextureKey='green_healthbar';
                }
                else{
                    player.healthBarTextureKey='red_healthbar'
                }
                player.addToScene();
            } 
        })
    }

    //---->Handle Player Movements----//
    movePlayers(){
        this.listOfPlayers.forEach((player)=>{
            player.move();
        })
    }
//---------###//

    //---->Handles Server Changes Related To Players----//
    handleChanges(delta:number){ 
        const PLAYERS:MapSchema=user.room.state.players;
        
        //---->ON ADD & CHANGES//
        PLAYERS.onAdd=(item,key)=>{
            PLAYERS.forEach((player,key)=>{
                const human=new Human(this,player.x,player.y,player.title,player.alive,player.id,player.state);
                this.addPlayers(player.id,human)
                this.changePlayerData(player);
            })
        }

        //---->ON REMOVE----//
        PLAYERS.onRemove=(item,key)=>{
            const player:Player=this.listOfPlayers.get(item.id)!;
            this.listOfPlayers.delete(key);
            player.remove();
            console.log(player+"Removed");
        }

        //--->PLAYER MOVEMENT----//
        this.movePlayers();
    }
/*
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
*/
    
    //--->MAIN GAME LOOP----//
    update(time: number, delta: number): void {
        this.handleChanges(delta);
    }
}