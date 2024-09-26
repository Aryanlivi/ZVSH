import {Schema,type} from "@colyseus/schema";
export class GiftSchema extends Schema{
    @type('boolean') isActive:boolean;
    @type('number')x:number;
    @type('number')y:number;
}