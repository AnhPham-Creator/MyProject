"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompareDatimeInput = exports.IsDatimeCompare = void 0;
var class_validator_1 = require("class-validator");
var IsDatimeCompare = /** @class */ (function () {
    function IsDatimeCompare() {
    }
    IsDatimeCompare.prototype.validate = function (dateTime, args) {
        var today = new Date();
        var timeToday = today.getTime();
        var dateTimeInput = new Date(dateTime);
        var dayInput = dateTimeInput.getTime();
        if (dayInput > timeToday) {
            return false;
        }
        return true;
    };
    IsDatimeCompare = __decorate([
        class_validator_1.ValidatorConstraint({ async: true })
    ], IsDatimeCompare);
    return IsDatimeCompare;
}());
exports.IsDatimeCompare = IsDatimeCompare;
function CompareDatimeInput(validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsDatimeCompare
        });
    };
}
exports.CompareDatimeInput = CompareDatimeInput;
