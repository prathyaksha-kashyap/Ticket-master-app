const Employee = require('../models/employee')

module.exports.list = (req,res) => {
    const { user } = req
    Employee.find({user: user._id}).populate('department', ['name'])
        .then((employee) => {
            res.json(employee)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.show = (req,res) => {
    const id = req.params.id
    const { user } = req
    Employee.findOne({user: user._id, _id: id}).populate('department', ['name'])
        .then((employee) => {
            if(employee){
                res.json(employee)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.create = (req,res) => {
    const { body, user } = req
    body.user = user._id
    const employee = new Employee(body)
    employee.save()
        .then((employee) => {
            Employee.findOne({_id: employee._id}).populate('department', ['name'])
                .then((employee) => {
                    res.send(employee)
                })
                .catch((err) => {
                    res.send(err)
                })
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.update = (req,res) => {
    const id = req.params.id
    const { body, user } = req
    Employee.findOneAndUpdate({user: user._id, _id: id}, body, {new: true, runValidators: true}).populate('department', ['name'])
        .then((employee) => {
            if(employee){
                res.json(employee)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res,json(err)
        })
}

module.exports.destroy = (req,res) => {
    const id = req.params.id
    const { user } = req
    Employee.findOneAndDelete({user: user._id, _id: id})
        .then((employee) => {
            if(employee){
                res,json({employee})
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}