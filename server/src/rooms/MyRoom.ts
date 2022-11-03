import { Room, Client, Deferred } from "colyseus";
import MyRoomState from "./schema/MyRoomState";
import { Human,HumanState} from "../Human";
import PlayerSchema from "../PlayerSchema";

export class MyRoom extends Room<MyRoomState>{

  onCreate (options: any) {
    this.setState(new MyRoomState());
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    this.assignPlayer();
    this.onMessage("Update-Pos",(client,message)=>{
      const player=this.state.players.get(message.id);
      player.x=message.x;
      player.y=message.y;
    })
    this.onMessage("Change-State",(client,message)=>{
      const player=this.state.players.get(message.id);
      player.state=message.state;
    })
    this.onMessage("Pointer-Down",(client,mouseclick)=>{
      const player=this.state.players.get(client.id);
      //console.log(player.state);
      player.assign({
        targetX:mouseclick.x,
        targetY:mouseclick.y,
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
          targetX:human.x,
          targetY:human.y,
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
