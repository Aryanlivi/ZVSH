"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoom = void 0;
const colyseus_1 = require("colyseus");
const MyRoomState_1 = __importDefault(require("./schema/MyRoomState"));
const Human_1 = require("../Human");
const Zombie_1 = require("../Zombie");
const PlayerSchema_1 = require("../PlayerSchema");
class MyRoom extends colyseus_1.Room {
    onCreate(options) {
        this.setState(new MyRoomState_1.default());
    }
    onJoin(client, options) {
        console.log(client.sessionId, "joined!");
        this.assignPlayer();
        this.onMessage("Update-Pos", (client, message) => {
            const player = this.state.players.get(message.id);
            player.x = message.x;
            player.y = message.y;
        });
        this.onMessage("Change-State", (client, message) => {
            const player = this.state.players.get(message.id);
            player.state = message.state;
            console.log(player.state);
        });
        this.onMessage("Pointer-Down", (client, mouseclick) => {
            const player = this.state.players.get(client.id);
            switch (player.type) {
                case PlayerSchema_1.PlayerType.Human:
                    {
                        player.state = PlayerSchema_1.PlayerStates.running;
                        break;
                    }
                case PlayerSchema_1.PlayerType.Zombie:
                    {
                        player.state = PlayerSchema_1.PlayerStates.lurch;
                        break;
                    }
            }
            player.assign({
                targetX: mouseclick.x,
                targetY: mouseclick.y
            });
        });
        /*
        this.onMessage("Gift-Added",(client,message)=>{
            this.state.gift.isActive=message.isActive;
            this.state.gift.x=message.x;
            this.state.gift.y=message.y;
        })*/
    }
    assignPlayer() {
        this.onMessage("Assign-Human", (client, message) => {
            console.log(client.id + "is now a Human.");
            const human = new Human_1.Human();
            human.assign({
                type: PlayerSchema_1.PlayerType.Human,
                state: PlayerSchema_1.PlayerStates.stand,
                title: 'title',
                alive: true,
                id: client.id,
                x: 700,
                y: 200,
                targetX: human.x,
                targetY: human.y,
                healthBarObj: 'my_healthBar'
            });
            this.state.players.set(client.id, human);
        });
        this.onMessage("Assign-Zombie", (client, message) => {
            console.log(client.id + "is now a Zombie.");
            const zombie = new Zombie_1.Zombie();
            zombie.assign({
                type: PlayerSchema_1.PlayerType.Zombie,
                state: PlayerSchema_1.PlayerStates.stand,
                title: "title",
                alive: true,
                id: client.id,
                x: 500,
                y: 300,
                targetX: zombie.x,
                targetY: zombie.y,
                healthBarObj: 'my_healthBar'
            });
            this.state.players.set(client.id, zombie);
        });
    }
    onLeave(client, consented) {
        console.log(client.sessionId, "left!");
        this.state.players.delete(client.id);
        console.log(this.state.players.size);
    }
    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
exports.MyRoom = MyRoom;
