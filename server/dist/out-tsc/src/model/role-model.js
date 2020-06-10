"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
;
var roleSchema = new Schema({
    role: {
        type: String
    }
});
var roles = mongoose_1.default.model('roles', roleSchema);
exports.default = roles;
