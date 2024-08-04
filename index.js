const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const cors=require('cors')
require("./Database/connection")
require('dotenv').config()
app.use(cors())
app.use(express.json())

app.use('/api/user', require('./Router/user'))
app.use('/api/train', require('./Router/train'))
app.use('/api/ticket', require('./Router/ticket'))
app.use('/api/station', require('./Router/station'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })