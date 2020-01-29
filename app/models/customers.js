const mongoose = require('mongoose')
const validator=require('validator')

const Schema = mongoose.Schema
const customersSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate:{
            validator:function (value){
                return validator.isEmail(value)
            },
            message:function (){
                return 'invalid email format'
            }
        }
    },
    mobile: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: Schema.Types.ObjectId
    }
})

const Customer = mongoose.model('Customer', customersSchema)

module.exports = Customer