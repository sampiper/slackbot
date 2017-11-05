const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const axios = require('axios')
const dashboard = require('node-meraki-dashboard')('6f2bd675a1b83710271a81dc141611241da484dd')

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
      getDeviceList(res);
    }

    else {
      res.json({
        response_type: 'ephemeral',
        text: 'hiya!'
      });
    }
  })

function getDeviceList(res) {
  dashboard.sm.listDevices('N_647392446434531551')
    .then(function(data) {
      var totalDevices = data.devices.length;
      var list = '';
      for (var i=0; i<totalDevices; i++) {
        if (data.devices[i].osName.startsWith('Android')) {
          list = list + ':android: '
        }
        else if (data.devices[i].osName.startsWith('iOS')) {
          list = list + ':apple_logo: '
        }
        list = list + data.devices[i].name + ' - ' + data.devices[i].systemModel + ' (' + data.devices[i].osName + ')' + '\n'

      }
     res.json({
       response_type: 'ephemeral',
       text: list
     });
    })
    .catch(function(error) {
      console.log(error)
    });
  }

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
