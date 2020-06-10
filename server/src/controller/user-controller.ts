import { Request, Response } from "express"
import { Types } from 'mongoose'
import { User, usermodel } from '../model/user-model'
import rolemodel from '../model/role-model'
import ErrorMiddleware from '../middleware/error.middleware'
import HttpException from "../common/http-exception"
import notFoundHandler from '../middleware/notFound.middleware'

export default class UserController {

    public async init(req: any, res: Response) {
        let users = await usermodel.find({}).populate('role')
        res.json({
            Users: users
        })
    }

    public async createUser(req: Request, res: Response) {
        const input = { ...req.body }
        let newUser = await usermodel.create(input)
        res.json({
            message: 'Create success',
            data: newUser
        })
    }

    public async getUserDetail(req: Request, res: Response) {
        let userId = req.params.userId
        let dataFind = await usermodel.findById({ _id: userId })
        res.json({
            data: dataFind
        })
    }

    public async deleteUser(req: Request, res: Response) {
        let userId = req.params.userId
        let findUser = await usermodel.findById({ _id: userId })
        if (findUser !== null) {
            await usermodel.deleteOne({ _id: userId })
            res.json({
                message: 'delete susccess',
            })
        }
    }

    public async updateUser(req: Request, res: Response) {
        let userId = req.params.userId
        let input = req.body
        let result = await usermodel.findByIdAndUpdate(userId, input, { strict: true })
        res.status(200).json({
            message: 'update succes'
        })
    }

    public async getRoles(req: Request, res: Response) {
        let roles = await rolemodel.find()
        res.json({
            data: roles
        })
    }
}