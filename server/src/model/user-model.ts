import mongoose, { Types } from 'mongoose'
const Schema = mongoose.Schema

export interface User {
    name: string
    email: string
    birthday: string
    tel: string
    role: Types.ObjectId
}

const userSchema = new Schema({
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
})



export const usermodel = mongoose.model('users', userSchema)