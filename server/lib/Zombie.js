"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zombie = void 0;
const PlayerSchema_1 = __importDefault(require("./PlayerSchema"));
class Zombie extends PlayerSchema_1.default {
}
exports.Zombie = Zombie;
Zombie.walkSpeed = 1.0;
