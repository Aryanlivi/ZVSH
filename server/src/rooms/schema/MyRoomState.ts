import { Schema,MapSchema ,Context, type } from "@colyseus/schema";
import PlayerSchema from "../../PlayerSchema";

export default class MyRoomState extends Schema {
  @type({map:PlayerSchema})players: MapSchema<PlayerSchema>;
  
  constructor(){
    super();
    this.players=new MapSchema();
  }
}