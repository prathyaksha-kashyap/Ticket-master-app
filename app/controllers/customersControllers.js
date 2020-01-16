const Customer = require('../models/customers')
const Ticket = require('../models/ticket')

module.exports.list = (req,res) => {
    const { user } = req
    Customer.find({user: user._id})
        .then((customer) => {
            res.json(customer)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.show = (req,res) => {
    const id = req.params.id
    const { user } = req
    Promise.all([Customer.findOne({_id: id, user: user._id}), Ticket.find({user: user._id, customer: id})])
        .then((values) => {
            const [ customer, tickets ] = values
            const customerObj = customer.toObject()
            customerObj.tickets = tickets
            res.send(customerObj)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.create = (req,res) => {
    const { body, user } = req
    body.user = user._id
    const customer = new Customer(body)
    customer.save()
        .then((customer) => {
            res.json(customer)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.modify = (req,res) => {
    const id = req.params.id
    const { body, user } = req
    Customer.findOneAndUpdate({_id: id, user: user._id}, body, {new: true, runValidators: true})
        .then((customer) => {
            res.json(customer)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.destroy = (req,res) => {
    const id = req.params.id
    const { user } = req
    Customer.findOneAndDelete({_id: id, user: user._id})
        .then(() => {
            res.json('Successfully deleted')
        })
        .catch((err) => {
            res.json(err)
        })
}
