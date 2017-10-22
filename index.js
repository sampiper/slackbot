const express = require('express')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



app.get('/', (req, res) => {
  var token = req.body.token
  res.send('Hello!' + token)
})
app.listen(3000, () => console.log('Server running on port 3000'))
