const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Shorturl = require('./models/shortURL')
const createURL = require('./public/javascripts/createURL')
const app = express()

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/shorten', (req, res) => {
  const originURL = req.body.URL
  Shorturl.findOne({ origin_url: originURL }).lean()
    // check if origin url exists 
    .then((url) => {
      if (!url) {
        createURL(originURL, res)
      }
      else {
        console.log('url exist!')
        res.render('index', { originURL: url.origin_url, shortURL: url.short_url })
      }
    })
})

app.listen('3000', () => {
  console.log('The app is listening on http://localhost:3000')
})

