import mongoose from 'mongoose'
const Schema = mongoose.Schema

var roleSchema = new Schema({
    role: {
        type: String
    }
})

const roles = mongoose.model('roles', roleSchema)
export default roles