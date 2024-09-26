"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerStates = exports.PlayerType = void 0;
const schema_1 = require("@colyseus/schema");
var PlayerType;
(function (PlayerType) {
    PlayerType[PlayerType["Human"] = 0] = "Human";
    PlayerType[PlayerType["Zombie"] = 1] = "Zombie";
})(PlayerType = exports.PlayerType || (exports.PlayerType = {}));
var PlayerStates;
(function (PlayerStates) {
    PlayerStates[PlayerStates["stand"] = 0] = "stand";
    PlayerStates[PlayerStates["running"] = 1] = "running";
    PlayerStates[PlayerStates["lurch"] = 2] = "lurch";
    PlayerStates[PlayerStates["attack"] = 3] = "attack";
})(PlayerStates = exports.PlayerStates || (exports.PlayerStates = {}));
class PlayerSchema extends schema_1.Schema {
}
__decorate([
    (0, schema_1.type)("string")
], PlayerSchema.prototype, "title", void 0);
__decorate([
    (0, schema_1.type)("boolean")
], PlayerSchema.prototype, "alive", void 0);
__decorate([
    (0, schema_1.type)("string")
], PlayerSchema.prototype, "id", void 0);
__decorate([
    (0, schema_1.type)("number")
], PlayerSchema.prototype, "type", void 0);
__decorate([
    (0, schema_1.type)("number")
], PlayerSchema.prototype, "x", void 0);
__decorate([
    (0, schema_1.type)("number")
], PlayerSchema.prototype, "y", void 0);
__decorate([
    (0, schema_1.type)("number")
], PlayerSchema.prototype, "targetX", void 0);
__decorate([
    (0, schema_1.type)("number")
], PlayerSchema.prototype, "targetY", void 0);
__decorate([
    (0, schema_1.type)("string")
], PlayerSchema.prototype, "healthBarObj", void 0);
__decorate([
    (0, schema_1.type)("number")
], PlayerSchema.prototype, "state", void 0);
exports.default = PlayerSchema;
