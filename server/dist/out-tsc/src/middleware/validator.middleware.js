"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatormiddleware = void 0;
var class_validator_1 = require("class-validator");
var user_valtdator_class_1 = __importDefault(require("../model/user-valtdator-class"));
exports.validatormiddleware = function (req, res, next) {
    var exampleUser = new user_valtdator_class_1.default(req.body.name, req.body.email, req.body.birthday, req.body.tel, req.body.role);
    class_validator_1.validate(exampleUser).then(function (errors) {
        console.log(errors.length);
        if (errors.length > 0) {
            res.status(400).json({
                errors: errors
            });
        }
        else {
            next();
        }
    });
};
