function generateURL() {
  const LowercaseLetter = 'abcdefghijklmnopqrstuvwxyz'
  const UppercareLetter = LowercaseLetter.toUpperCase()
  const number = '1234567890'
  const arr = LowercaseLetter + UppercareLetter + number

  console.log('generate short url ...')

  let keystr = ''

  for (let i = 0; i < 5; i++) {
    keystr += arr[Math.floor(Math.random() * arr.length)]
  }

  console.log('url is', keystr)
  return keystr

}

function createURL(originURL, res, hostname) {
  const Shorturl = require('../../models/shortURL')
  require('../../config/mongoose')
  let shortURL = generateURL()

  Shorturl
    .create({
      origin_url: originURL,
      short_url: shortURL
    })
    .then(() => {
      res.render('index', { originURL, shortURL, hostname })
    })
    // if create error (violate short_url unique), regenerate another one
    .catch(() => {
      console.log('invalid URL. regenerate url')
      createURL(originURL, res, hostname)
    })
}

module.exports = createURL
