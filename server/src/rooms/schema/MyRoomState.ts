import { Schema,MapSchema ,Context, type } from "@colyseus/schema";
import { GiftSchema } from "../../GiftSchema";
import PlayerSchema from "../../PlayerSchema";

export default class MyRoomState extends Schema {
  @type({map:PlayerSchema})players: MapSchema<PlayerSchema>;
  @type((GiftSchema))gift:GiftSchema;
  constructor(){
    super();
    this.players=new MapSchema();
  }
}