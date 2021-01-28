const express = require('express')
const parser = require('body-parser')
const services = require('./services')
const { users, posts } = require('./endpoints')
const { authenticate } = require('./middlewares')
const app = express()
const port = 3030

app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

const usersHandlers = users(services)
const postsHandlers = posts(services)

app.get('/users/', usersHandlers.get)
app.post('/users/', usersHandlers.post)
app.put('/users/:id', usersHandlers.put)
app.delete('/users/:id', usersHandlers.delete)
app.post('/posts/', authenticate, postsHandlers.post)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app