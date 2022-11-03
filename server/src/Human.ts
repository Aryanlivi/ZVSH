import PlayerSchema from "./PlayerSchema";
export enum HumanState{
    l_stance=0,
    l_running
}
export class Human extends PlayerSchema{
    private static readonly walkSpeed:number=1.0;
    constructor(){
        super();
        this.state=HumanState.l_stance;
    }
}