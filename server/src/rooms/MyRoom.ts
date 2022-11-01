import { Room, Client, Deferred } from "colyseus";
import MyRoomState from "./schema/MyRoomState";
import { Human,HumanState} from "../Human";
import Player from "../Player";

export class MyRoom extends Room<MyRoomState>{

  onCreate (options: any) {
    this.setState(new MyRoomState());
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    this.assignPlayer();
    this.onMessage("Pointer-Down",(client,mouseclick)=>{
      const player=this.state.players.get(client.id);
      player.assign({
        x:mouseclick.x,
        y:mouseclick.y,
        state:HumanState.l_running
      })
    })
  }
  assignPlayer(){
      this.onMessage("Assign-Human",(client,message)=>{
        console.log(client.id+"is now a Human.");
        const human=new Human();
        human.assign({
          state:HumanState.l_stance,
          title:'title',
          alive:true,
          id:client.id,
          x:700,
          y:200,
          healthBarObj:'my_healthBar'
        });
        this.state.players.set(client.id,human);
    })
    /*
    this.onMessage("Assign-Zombie",(client,message)=>{
      console.log(client.sessionId+"is now a Zombie.");
      this.broadcast("create_zombie");
    })
    */
  }
    onLeave (client: Client, consented: boolean) {
      console.log(client.sessionId, "left!");
      this.state.players.delete(client.id)
      console.log(this.state.players.size);
    }
  
    onDispose() {
      console.log("room", this.roomId, "disposing...");
      }

}
