import { Room, Client } from "colyseus";
import MyRoomState from "./schema/MyRoomState";
import { Human,HumanState} from "../Human";

export class MyRoom extends Room<MyRoomState>{

  onCreate (options: any) {
    this.setState(new MyRoomState());
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    this.assignPlayer();  
    this.onMessage("GameScene",(client,message)=>{
      this.updateHuman();
    })
  }
  assignPlayer(){
      this.onMessage("Assign-Human",(client,message)=>{
        console.log(client.sessionId+"is now a Human.");
        const human=new Human();
        human.assign({
          state:HumanState.l_stance,
          title:client.id,
          alive:true,
          id:this.state.players.length,
          posX:200,
          posY:200
        });
        this.state.players.push(human);
        this.broadcast("Assign_Human",human);
    })
    /*
    this.onMessage("Assign-Zombie",(client,message)=>{
      console.log(client.sessionId+"is now a Zombie.");
      this.broadcast("create_zombie");
    })
    */
  }
  updateHuman(){
      if(this.state.players.length>0){
        for(let i=0;i<this.state.players.length;i++){
          console.log("hey")
          this.broadcast("create_human",this.state.players[i]);
        }   
      }
      this.onMessage("Pointer-Down",(client,mouseclick)=>{
        this.state.players.forEach((e)=>{
          if(e.title==client.id){
            console.log(e.id);
            e.posX=mouseclick.x;
            e.posY=mouseclick.y;
          }
          this.broadcast("update_human",e);
        })
      })
    }







    onLeave (client: Client, consented: boolean) {
      console.log(client.sessionId, "left!");
      this.state.players.forEach((e)=>{
        if(e.title==client.id){
          this.state.players.deleteAt(e.id);
        }
      })
    }
  
    onDispose() {
      console.log("room", this.roomId, "disposing...");
      this.state.dispose();
      }

}
