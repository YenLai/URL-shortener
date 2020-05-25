function getRandom() {
  const LowercaseLetter = 'abcdefghijklmnopqrstuvwxyz'
  const UppercareLetter = LowercaseLetter.toUpperCase()
  const number = '1234567890'
  const arr = LowercaseLetter + UppercareLetter + number

  const Shorturl = require('./models/shortURL')
  require('./config/mongoose')

  let keystr = ''
  while (keystr === '') {
    for (let i = 0; i < 5; i++) {
      keystr += arr[Math.floor(Math.random() * arr.length)]
    }
    Shorturl.findOne({ short_url: keystr })
      .then((url) => {
        if (url) keystr = ''
      })
      .catch(error => console.log(error))
  }
  return keystr
}

module.exports = getRandom