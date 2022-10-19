import Player from "./Player"
export default class Zombie extends Player{
    addtoScene(){
        console.log("Zombie added to Scene!");
    }
    removeFromScene(){
        this.destroy();
    }
    update(){
        console.log("Updated Zombie")
    }
}