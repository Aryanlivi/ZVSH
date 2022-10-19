import  Human  from "./Human";
import {Scene} from "phaser";
import {user} from "./services/User";
import Player from "./Player";
import { Schema,ArraySchema ,Context, type } from "@colyseus/schema";

export default class GameScene extends Scene{
    player:Player;
    const listOfPlayers:[];
    constructor(){
        super('GameScene_Key');
    }

    preload(){
        user.room.send("GameScene");
    } 
    
    create ()
    {
        this.initMockup();
        this.handleMsg();
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
        const players:ArraySchema=user.room.state.players;
        players.onAdd=(item,key)=>{
            this.player=new Human(this,e.posX,e.posY,e.title,e.alive,e.id,e.state);
            this.player.addToScene();
            const human=new Human(this,item.posX,item.posY,item.title,item.alive,item.id,item.state);
            this.listOfPlayers[item.id]=human;     
        };
        //players.onRemove=(item,key)=>{};
        players.onChange=(item,key)=>{
            const id=item.id;
            Player p=this.listOfPlayers[id];
            p.x=item.x;
            p.y=item.y;
        };
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