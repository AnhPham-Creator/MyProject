import {
    registerDecorator, ValidationOptions, ValidatorConstraint,
    ValidatorConstraintInterface, ValidationArguments, isDate
} from "class-validator"
import { usermodel } from '../model/user-model'

@ValidatorConstraint({ async: true })
export class IsDatimeCompare implements ValidatorConstraintInterface {

    validate(dateTime: string, args: ValidationArguments) {
        let today = new Date()
        let dateTimeInput = new Date(dateTime)
        if (!isDate(dateTimeInput) || dateTimeInput > today) {
            return false
        }
        return true
    }
}

export function CompareDatimeInput(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsDatimeCompare
        })
    }
}

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
    validate(email: any, args: ValidationArguments) {
        return usermodel.find({ email: email }).then(user => {
            if (user.length > 0) return false;
            return true;
        })
    }
}
export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailAlreadyExistConstraint
        })
    }
}