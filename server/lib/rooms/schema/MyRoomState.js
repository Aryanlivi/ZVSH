"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("@colyseus/schema");
const GiftSchema_1 = require("../../GiftSchema");
const PlayerSchema_1 = __importDefault(require("../../PlayerSchema"));
class MyRoomState extends schema_1.Schema {
    constructor() {
        super();
        this.players = new schema_1.MapSchema();
    }
}
__decorate([
    (0, schema_1.type)({ map: PlayerSchema_1.default })
], MyRoomState.prototype, "players", void 0);
__decorate([
    (0, schema_1.type)((GiftSchema_1.GiftSchema))
], MyRoomState.prototype, "gift", void 0);
exports.default = MyRoomState;
