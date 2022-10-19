import  Human  from "./Human";
import {Scene} from "phaser";
import {user} from "./services/User";
import Player from "./Player";
import Zombie  from "./Zombie";
import {MapSchema } from "@colyseus/schema";
import { it } from "node:test";

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
        //this.getId();
        this.handleChanges();
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
                console.log("X:"+mouseclick.x+"\t Y:"+mouseclick.y);
                user.room.send("Pointer-Down",mouseclick);  
            }
        })
    }
    handleChanges()
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
                        const player=this.listOfPlayers.get(e.id)!;
                        if(change.field=="x"){
                            player.x=change.value;
                        }
                        if(change.field=="y"){
                            player.y=change.value;
                        }
                        if(change.field=="title"){
                            player.title=change.value;
                        }
                        if(change.field=="alive"){
                            player.alive=change.value;
                        }
                        if(change.field=="id"){
                            player.id=change.value;
                        }
                    })
                }
            })

            ///////////////
            this.listOfPlayers.forEach((e)=>{
                e.addToScene();
            })

            
        }

        ////////////////////
        players.onRemove=(item,key)=>{
            console.log(item.id);
            // ! at the end helps in removing null or undefined
            const player:Player=this.listOfPlayers.get(item.id)!;
            player.destroy();
            console.log(player+"Removed");
        }
    }
    getId(){
        console.log(user.id);
    }
    /*
    handleMsg(){
        user.room.onMessage("Assign_Human",(e)=>{
            this.player=new Human(this,e.posX,e.posY,e.title,e.alive,e.id,e.state);
            this.player.addToScene();
        })
        user.room.onMessage("create_human",(e)=>{
            console.log(e);
            this.createHuman(e);
        });
        user.room.onMessage("create_zombie",(e)=>{
            this.createZombie(e);
        });
        user.room.onMessage("update_human",(e)=>{
            this.player.update(e.posX,e.posY,e.alive,e.state);
        })
    }
    createHuman(e){
        console.log("Human created!");
        const player=new Human(this,e.posX,e.posY,e.title,e.alive,e.id,e.state);
        player.addToScene();
    }
    createZombie(e){
        console.log("Zombie created!");
    }
    */
}