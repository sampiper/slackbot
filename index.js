const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')


const VERIFY_TOKEN = '8XkWoOTBKelGQkiExVgH5sbH'
if (!VERIFY_TOKEN) {
  console.error('VERIFY_TOKEN is required')
  process.exit(1)
}

const app = express()
app.use(morgan('dev'))

app.route('/devices')
  .get(function (req, res) {
    res.sendStatus(200)
  })

  .post(bodyParser.urlencoded({ extended: true }), function (req, res) {
    if (req.body.token !== VERIFY_TOKEN) {
      return res.sendStatus(401)
    }

    var message = 'hello!'

    if (req.body.text === 'list') {
      message = "Sorry, I can't do that yet."
    }

    res.json({
      response_type: 'ephemeral',
      text: message
    })
  })

  app.listen(3000, () => console.log('Server running on port 3000'))


/*
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



app.get('/devices', (req, res) => {
  var token = req.body.token
  res.json({
    response_type: 'ephemeral',
    text: 'hello'
  })
})
app.listen(3000, () => console.log('Server running on port 3000'))*/
