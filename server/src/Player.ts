import {Schema,type} from "@colyseus/schema"
export default class Player extends Schema{
    @type("string") title:string;
    @type("boolean") alive:Boolean;
    @type("number")id:number;
    @type("number") posX:number;
    @type("number")posY:number;
}