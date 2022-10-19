import Player from "./Player";
export enum HumanState{
    l_stance=0,
    l_running
}
export class Human extends Player{
    private static readonly walkSpeed:number=1.0;
    state:HumanState;
    constructor(){
        super();
        this.state=HumanState.l_stance;
    }
}