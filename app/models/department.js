const mongoose = require('mongoose')
const Schema = mongoose.Schema

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId
    }
})

const Department = mongoose.model('Department', departmentSchema)

module.exports = Department
