const express = require('express')
const app = express()
const port = 3333

const router = require('./config/routes')
const cors = require('cors')
app.use(cors())
app.use(express.json())

const configureDb = require('./config/database')
configureDb()

app.use('/', router)

app.listen(port,() => {
    console.log('listeninig to port',port)
})