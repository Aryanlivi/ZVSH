import { Schema,MapSchema ,Context, type } from "@colyseus/schema";
import Player from "../../Player";

export default class MyRoomState extends Schema {
  @type({map:Player})players: MapSchema<Player>;
  
  constructor(){
    super();
    this.players=new MapSchema();
  }
}