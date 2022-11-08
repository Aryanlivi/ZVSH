import PlayerSchema from "./PlayerSchema";
export enum ZombieState{
    stance=2,
    lurch
}
export class Zombie extends PlayerSchema{
    private static readonly walkSpeed:number=1.0;
}