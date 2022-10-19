import  Human  from "./Human";
import {Scene} from "phaser";
import {user} from "./services/User";
import Player from "./Player";
import Zombie  from "./Zombie";
import {MapSchema } from "@colyseus/schema";

export default class GameScene extends Scene{
    player:Player;
    id:string;
    listOfPlayers:Map<string,Player>=new Map();
    constructor(){
        super('GameScene_Key');
    }

    preload(){} 
    
    create ()
    {
        this.initMockup();
        this.getId();
        this.handler();
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

    handler()
    {
        const players:MapSchema=user.room.state.players;
        players.onAdd=(item,key)=>{
            console.log("Player added");
            const human=new Human(this,item.x,item.y,item.title,item.alive,item.id,item.state);
            this.listOfPlayers.set(item.id,human);
            this.listOfPlayers.get(item.id)?.addToScene();
            console.log(this.listOfPlayers);
        };
        players.onRemove=(item,key)=>{
            console.log(item.id);
            const a=this.listOfPlayers.get(item.id);
            console.log(a+"Removed")
        };
        players.onChange=(item,key)=>{
            console.log("updated")
            const p:Player=this.listOfPlayers[item.id];
            p.x=item.x;
            p.y=item.y;
            p.alive=item.alive;
            p.state=item.state;
        };
        //p.update(item.x,item.y,item.alive,item.state);
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