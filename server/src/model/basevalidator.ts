import {
    IsEmail, IsNotEmpty, MaxLength, IsNumberString,
    MinLength, IsMongoId, Matches, IsString, MaxDate
} from "class-validator"
import { Types } from 'mongoose'
import { CompareDatimeInput, IsEmailAlreadyExist } from "../middleware/validator-define"

export default class BaseUserValidator {

    @IsNotEmpty({
        message: "Name is required."
    })
    @IsString({
        message: "Name must is string"
    })
    @MaxLength(100, {
        message: "Name must be shorter than or equal to $constraint1 characters."
    })
    @Matches(/^[A-Za-z0-9 ]+$/, {
        message: "Name does not contain special characters"
    })
    public name: string

    @IsNotEmpty({
        message: "Email address is required."
    })
    @IsEmail(undefined, {
        message: "Email address must be an email address."
    })
    @IsEmailAlreadyExist({
        message: "Email Already exist!"
    })
    public email: string

    @IsNotEmpty({
        message: "birthday is required."
    })
    @CompareDatimeInput({
        message: "birthday invalid"
    })
    public birthday: string

    @IsNotEmpty({
        message: "tel is required."
    })
    @MaxLength(11, {
        message: "tel must be shorter than or equal to $constraint1 number."
    })
    @MinLength(10, {
        message: "tel must be longer than to or equal $constraint1 number."
    })
    @IsNumberString(undefined, {
        message: "tel must is string number"
    })
    public tel: string

    @IsNotEmpty({
        message: "role is required."
    })
    @IsMongoId({
        message: "role must is MongoId!"
    })
    public role: Types.ObjectId

    constructor(name: string, email: string, birthday: string, tel: string, role: Types.ObjectId) {
        this.name = name
        this.email = email
        this.birthday = birthday
        this.tel = tel
        this.role = role
    }

}