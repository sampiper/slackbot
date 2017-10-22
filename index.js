const express = require('express')
const app = express()
app.get('/', (req, res) => {
  var token = req.body.token
  res.send('Hello!' + token)
})
app.listen(3000, () => console.log('Server running on port 3000'))
