const express = require('express')
const mustacheExpress = require('mustache-express')
const session = require('express-session')

const app = express()
app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', 'src/views')

app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'secreto', resave: false, saveUninitialized: true }))

const routes = require('./src/routes/route')
app.use('/', routes)

app.listen(3000, () => console.log('Servidor rodando na porta 3000'))