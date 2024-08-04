const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const user=require("./Router/user")
const train=require("./Router/train")
const cors=require('cors')
require("./Database/connection")
require('dotenv').config()
app.use(cors())
app.use(express.json())

app.use(user)
app.use(train)

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })