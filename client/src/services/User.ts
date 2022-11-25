import {Client,Room} from "colyseus.js";
class User{
    client:Client;
    room:Room;
    id:string;
    constructor(){
        //Maitidevi:192.168.11.71
        this.client=new Client("ws://192.168.11.71:2567");
    }
    async join(){
        console.log("Joining Room...");
        try{
            this.room=await this.client.joinOrCreate("my_room");
            this.id=this.room.sessionId;
            console.log(this.id+" Joined Successfully!");
        }catch(e){
            console.log("Error joining!\n");
            console.log(e);           
        }
        return true;
    }
}
export const user=new User();