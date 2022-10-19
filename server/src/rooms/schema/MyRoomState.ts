import { Schema,ArraySchema ,Context, type } from "@colyseus/schema";
import Player from "../../Player";

export default class MyRoomState extends Schema {
  @type([ Player ])players: ArraySchema<Player>;
  
  constructor(){
    super();
    this.players=new ArraySchema();
  }
  dispose(){
    for(let i=0;i<this.players.length;i++){
      this.players.pop();
    }
    //console.log("No of player after disposing="+this.arrayOfPlayers.length);
  }
}