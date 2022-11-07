import PlayerSchema from "./PlayerSchema";
export enum HumanState{
    stance=0,
    running
}
export class Human extends PlayerSchema{
    private static readonly walkSpeed:number=1.0;
}