import {Scene} from "phaser";
import {user} from "./services/User";
import { KEY } from "./Constants";
import {listOfPlayers} from "./GlobalVar"
import Player, { PlayerType } from "./Player";
import PlayerSchema from "../../server//src/PlayerSchema"
//import Zombie  from "./Zombie";
import {MapSchema} from "@colyseus/schema";
import  {Human}  from "./Human";
import {Zombie} from "./Zombie";

//---->Main Game Scene----//
export default class GameScene extends Scene{
    //private listOfPlayers:Map<string,Player>=new Map();
    constructor(){
        //super takes in a key as arg to identify scene!
        super(KEY.gamescene);
    }
    //---->Phaser Preload----//
    preload(){ console.log(KEY.gamescene) } 
    //---->Phaser Create----//
    create ()
    {
        this.initMockup();
        
    }

    //---->initializes Mockup----//
    initMockup(){
        const MOCKUP=this.add.image(0,0,KEY.mockup).setOrigin(0,0);
        MOCKUP.setInteractive();
        MOCKUP.on("pointerdown",(pointer)=>{
            if(pointer.leftButtonDown()){
                const MOUSECLICK={
                    x:this.game.input.mousePointer.x,
                    y:this.game.input.mousePointer.y
                }
                //console.log("X:"+mouseclick.x+"\t Y:"+mouseclick.y);
                user.room.send("Pointer-Down",MOUSECLICK);  
            }
        })
    }

//###------>Functions involving Player//

    //---->handles player updates----//
    changePlayerData(player:PlayerSchema){
        player.onChange=(changes)=>{
            changes.forEach((change)=>{
                const PLAYER_TO_UPDATE=listOfPlayers.get(player.id)!;
                switch(change.field){
                    case "alive":
                        PLAYER_TO_UPDATE.alive=change.value;
                        break;
                    case "title":
                        PLAYER_TO_UPDATE.title=change.value;
                        break;
                    case "id":
                        PLAYER_TO_UPDATE.id=change.value;
                        break;
                    case "targetX":
                        PLAYER_TO_UPDATE.targetX=change.value;
                        break;
                    case "targetY":
                        PLAYER_TO_UPDATE.targetY=change.value;
                        break;
                    case "state":
                        PLAYER_TO_UPDATE.state=change.value;
                        break;
                }
            })
        }
    }

    //---->Add Players to list and scene----//
    addPlayers(id:string,player:Player){
        //Sync players<MapSchema> to listofPlayers
        if(!listOfPlayers.has(id))   
        {
            listOfPlayers.set(id,player);
        }

        //-->Adds to Scene
        listOfPlayers.forEach((player)=>{
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

    updatePlayers(){
        listOfPlayers.forEach((player)=>{
            player.update();
        })
    }
//---------###//

    //---->Handles Server Changes Related To Players----//
    handleChanges(delta:number){ 
        const PLAYERS_SCHEMA:MapSchema=user.room.state.players;
        
        //---->ON ADD & CHANGES//
        PLAYERS_SCHEMA.onAdd=(item,key)=>{
            PLAYERS_SCHEMA.forEach((player,key)=>{
                let player_instance:Player;
                switch(player.type){
                    case PlayerType.Human:
                    {
                        player_instance=new Human(this,player.x,player.y,player.targetX,player.targetY,player.title,player.alive,player.id,player.state);
                        console.log("human");
                        break;
                    }
                    case PlayerType.Zombie:
                        {
                            player_instance=new Zombie(this,player.x,player.y,player.targetX,player.targetY,player.title,player.alive,player.id,player.state);
                            console.log("zombie");
                            break;
                        }
                }
                
                this.addPlayers(player.id,player_instance!)
                this.changePlayerData(player);
            })
        }

        //---->ON REMOVE----//
        PLAYERS_SCHEMA.onRemove=(item,key)=>{
            const player:Player=listOfPlayers.get(item.id)!;
            listOfPlayers.delete(key);
            player.remove();
            console.log(player+"Removed");
        }
        //--->PLAYER MOVEMENT----//
        this.updatePlayers();
    }
    //--->MAIN GAME LOOP----//
    update(time: number, delta: number): void {
        this.handleChanges(delta);
    }
}