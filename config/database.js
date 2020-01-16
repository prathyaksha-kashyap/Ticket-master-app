const mongoose = require('mongoose')

const configreDb = () => {
    mongoose.connect('mongodb://localhost:27017/ticket-master',  { useNewUrlParser: true })
        .then(() => {
            console.log('connected to db')            
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = configreDb