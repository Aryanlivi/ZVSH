"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Human = void 0;
const PlayerSchema_1 = __importDefault(require("./PlayerSchema"));
class Human extends PlayerSchema_1.default {
}
exports.Human = Human;
Human.walkSpeed = 1.0;
