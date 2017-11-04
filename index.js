const express = require('express')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



app.get('/devices', (req, res) => {
  var token = req.token
  res.send('Hello!' + token)
})
app.listen(3000, () => console.log('Server running on port 3000'))
