const Ticket = require('../models/ticket')

module.exports.list = (req,res) => {
    const { user } = req
    Ticket.find({user: user._id}).populate('customer', ['name']).populate('department', ['name']).populate('employee', ['name'])
        .then((ticket) => {
            res.json(ticket)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.show = (req,res) => {
    const id = req.params.id
    const { user } = req
    Ticket.findOne({_id: id, user: user._id}).populate('customer', ['name']).populate('department', ['name']).populate('employee', ['name'])
        .then((ticket) => {
            if(ticket){
                res.json(ticket)
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
    const ticket = new Ticket(body)
    ticket.save()
        .then((ticket) => {
            Ticket.findOne({_id: ticket._id}).populate('customer', ['name']).populate('department', ['name']).populate('employee', ['name'])
                .then((ticket) => {
                    res.send(ticket)
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
    Ticket.findOneAndUpdate({_id: id, user: user._id}, body, {new: true, runValidators: true}).populate('customer', ['name']).populate('department', ['name']).populate('employee', ['name'])
        .then((ticket) => {
            if(ticket){
                res.json(ticket)
            } else {
                res.json(ticket)
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.destroy = (req,res) => {
    const id = req.params.id
    const { user } = req
    Ticket.findOneAndDelete({_id: id, user: user._id})
        .then((ticket) => {
            if(ticket){
                res.json({ticket})
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}
