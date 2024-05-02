const express = require('express') // similar as import { express } from 'express'
require('dotenv').config()
const app = express() //express ke use korbe emon variable
const port = 4000

app.get('/', (req, res) => { //(req, res) => {res.send('Hello World!')}) ---> eta callback function, ja response pathay
  res.send('Hello World!')
})

app.get('/twiter', (req, res) => {
    res.send('Twiter ter ter ter!') //sending string
})

app.get('/facebook', (req, res) => {
    res.send('<h1>facebook book book book!</h1>') //sending heading
})

// response listen na korle ki dorkar taar?taito listen dorkar(jeta express bhai kore)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})