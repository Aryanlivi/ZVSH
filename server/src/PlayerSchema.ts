import {Schema,type} from "@colyseus/schema";
import {HumanState} from "./Human";
export default class PlayerSchema extends Schema{
    @type("string") title:string;
    @type("boolean")alive:Boolean;
    @type("string") id:string;
    @type("number") x:number;
    @type("number") y:number;
    @type("number") targetX:number;
    @type("number") targetY:number;
    @type("string") healthBarObj:string;
    @type("number")state:HumanState;
}