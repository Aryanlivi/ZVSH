import {Client,Room} from "colyseus.js";
class User{
    client:Client;
    room:Room;
    constructor(){
        this.client=new Client("ws://localhost:2567");
    }
    async join(){
        console.log("Joining Room...");
        try{
            this.room=await this.client.joinOrCreate("my_room");
            console.log("Joined Successfully!");
            
        }catch(e){
            console.log("Error joining!\n");
            console.log(e);           
        }
        return true;
    }
}
export const user=new User();