"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var class_validator_1 = require("class-validator");
var mongoose_1 = require("mongoose");
var validator_datetime_1 = require("../middleware/validator-datetime");
var UserValidator = /** @class */ (function () {
    function UserValidator(name, email, birthday, tel, role) {
        this.name = name;
        this.email = email;
        this.birthday = birthday;
        this.tel = tel;
        this.role = role;
    }
    __decorate([
        class_validator_1.IsNotEmpty({
            message: "Name is required."
        }),
        class_validator_1.MaxLength(100, {
            message: "Name must be shorter than or equal to $constraint1 characters."
        }),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], UserValidator.prototype, "name", void 0);
    __decorate([
        class_validator_1.IsNotEmpty({
            message: "birthday is required."
        }),
        class_validator_1.IsDateString({
            message: "birthday must type date time"
        }),
        validator_datetime_1.CompareDatimeInput({
            message: 'input date less than current day'
        }),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], UserValidator.prototype, "birthday", void 0);
    __decorate([
        class_validator_1.IsNotEmpty({
            message: "Email address is required."
        }),
        class_validator_1.IsEmail(undefined, {
            message: "Email address must be an email address."
        }),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], UserValidator.prototype, "email", void 0);
    __decorate([
        class_validator_1.IsNotEmpty({
            message: "tel is required."
        }),
        class_validator_1.MaxLength(11, {
            message: "Name must be shorter than or equal to $constraint1 number."
        }),
        class_validator_1.MinLength(10, {
            message: "Name must be longer than to or equal $constraint1 number."
        }),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], UserValidator.prototype, "tel", void 0);
    __decorate([
        class_validator_1.IsNotEmpty({
            message: "role is required."
        }),
        class_validator_1.IsMongoId({
            message: "role must is Admin or Gest"
        }),
        class_validator_1.IsOptional(),
        __metadata("design:type", mongoose_1.Types.ObjectId)
    ], UserValidator.prototype, "role", void 0);
    return UserValidator;
}());
exports.default = UserValidator;
