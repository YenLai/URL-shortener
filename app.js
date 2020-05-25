const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Shorturl = require('./models/shortURL')
const getRandom = require('./getRandom')
const app = express()

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/shorten', (req, res) => {
  const body = req.body.URL
  const shorturl = getRandom()
  Shorturl.create({
    origin_url: body,
    short_url: shorturl
  })
    .then(() => res.render('index', { shorturl }))
    .catch(error => console.log(error))
})




app.listen('3000', () => {
  console.log('The app is listening on http://localhost:3000')
})

