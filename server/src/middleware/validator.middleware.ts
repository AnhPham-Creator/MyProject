import { validate } from "class-validator"
import BaseUserValidator from '../model/basevalidator'
import { Request, Response, NextFunction } from "express"

export const validatormiddleware = (req: Request, res: Response, next: NextFunction): void => {
    let properties = {}
    let input = { ...req.body }
    let exampleUser = new BaseUserValidator(input.name, input.email, input.birthday, input.tel, input.role)
    if (req.method === 'PUT') {
        properties = { skipMissingProperties: true }
    } else {
        properties = { skipMissingProperties: false }
    }

    validate(exampleUser, properties).then(errors => {
        if (errors.length > 0) {
            res.status(400).json({
                errors: errors
            })
        } else {
            next()
        }
    })
}