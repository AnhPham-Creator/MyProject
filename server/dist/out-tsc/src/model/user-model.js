"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usermodel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
;
var userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    birthday: {
        type: String
    },
    tel: {
        type: String
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'roles'
    }
});
exports.usermodel = mongoose_1.default.model('users', userSchema);
