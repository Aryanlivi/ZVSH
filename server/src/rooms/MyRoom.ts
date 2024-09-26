import { Room, Client, Deferred } from "colyseus";
import MyRoomState from "./schema/MyRoomState";
import { Human} from "../Human";
import { Zombie } from "../Zombie";
import PlayerSchema,{PlayerStates,PlayerType} from "../PlayerSchema";
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
      console.log(player.state);
    })
    this.onMessage("Pointer-Down",(client,mouseclick)=>{
      const player=this.state.players.get(client.id);
      switch(player.type){
        case PlayerType.Human:
        {
          player.state=PlayerStates.running;
          break;
        }
        case PlayerType.Zombie:
        {
          player.state=PlayerStates.lurch;
          break;
        }
      }
      player.assign({
        targetX:mouseclick.x,
        targetY:mouseclick.y
      })
    })
    /*
    this.onMessage("Gift-Added",(client,message)=>{
        this.state.gift.isActive=message.isActive;
        this.state.gift.x=message.x;
        this.state.gift.y=message.y;
    })*/
  }
  
  assignPlayer(){
      this.onMessage("Assign-Human",(client,message)=>{
        console.log(client.id+"is now a Human.");       
        const human=new Human();
        human.assign({
          type:PlayerType.Human,
          state:PlayerStates.stand,
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

    
    this.onMessage("Assign-Zombie",(client,message)=>{
      console.log(client.id+"is now a Zombie.");
      const zombie=new Zombie();
      zombie.assign({
        type:PlayerType.Zombie,
        state:PlayerStates.stand,
        title:"title",
        alive:true,
        id:client.id,
        x:500,
        y:300,
        targetX:zombie.x,
        targetY:zombie.y,
        healthBarObj:'my_healthBar'
      })
      this.state.players.set(client.id,zombie);
    })
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
