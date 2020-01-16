const Department = require('../models/department')
const Employee = require('../models/employee')
const Ticket = require('../models/ticket')

module.exports.list = (req,res) => {
    const { user } = req
    Department.find({user: user._id})
        .then((department) => {
            res.json(department)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.show = (req,res) => {
    const id = req.params.id
    const { user } = req
    Promise.all([Department.findOne({user: user._id, _id: id}), Employee.find({user: user._id, department: id}), Ticket.find({user: user._id, department: id})])
        .then((values) => {
            const [ department, employees, tickets ] = values
            const departmentObj = department.toObject()
            departmentObj.employees = employees
            departmentObj.tickets = tickets
            res.send(departmentObj)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.create = (req,res) => {
    const { body, user } = req
    body.user = user._id
    const department = new Department(body)
    department.save()
        .then((department) => {
            res.json(department)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.update = (req,res) => {
    const id = req.params.id
    const { body, user } = req
    Department.findOneAndUpdate({user: user._id, _id: id}, body, {new: true, runValidators: true})
    .then((department) => {
        if(department){
            res.json(department)
        } else {
            res.json({})
        }
    })
    .catch((err) => {
        res.json(err)
    })
}

module.exports.destroy = (req,res) => {
    const id = req.params.id
    const { user } = req
    Department.findOneAndDelete({user: user._id, _id: id})
        .then((department) => {
            if(department){
                res,json(department)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}