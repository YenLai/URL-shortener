const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Shorturl = require('./models/shortURL')
const createURL = require('./public/javascripts/createURL')
const app = express()
const PORT = process.env.PORT || 3000

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/shorten', (req, res) => {
  const hostname = req.hostname
  const originURL = req.body.URL
  Shorturl.findOne({ origin_url: originURL }).lean()
    // check if origin url exists 
    .then((url) => {
      if (!url) {
        createURL(originURL, res, hostname)
      }
      else {
        console.log('url exist!')
        res.render('index', { originURL, shortURL: url.short_url, hostname })
      }
    })
})

app.get('/:id', (req, res) => {
  const id = req.params.id
  console.log(id)
  Shorturl.findOne({ short_url: id })
    .then(url => res.redirect(`${url.origin_url}`))
    .catch(() => res.send(`<h1>Can not find this page.</h1>`))
})

app.listen(PORT, () => {
  console.log(`The app is listening on http://localhost:${PORT}`)
})

