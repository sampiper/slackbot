require('dotenv').config() // Get API keys from .env
const VERIFY_TOKEN   = process.env.SLACK_DEVICES_TOKEN
const MERAKI_API_KEY = process.env.MERAKI_API_KEY
const MERAKI_NET_ID  = process.env.MERAKI_NETWORK_ID

const express    = require('express')
const bodyParser = require('body-parser')
//const morgan     = require('morgan')
const axios      = require('axios')
const dashboard  = require('node-meraki-dashboard')(MERAKI_API_KEY)

if (!VERIFY_TOKEN) {
  console.error('VERIFY_TOKEN is required')
  process.exit(1)
}

const app = express()
//app.use(morgan('dev'))

app.route('/devices')
  .get(function (req, res) {
    res.sendStatus(200)
  })

  .post(bodyParser.urlencoded({ extended: true }), function (req, res) {
    if (req.body.token !== VERIFY_TOKEN) {
      return res.sendStatus(401)
    }

    var message = req.body.text.toLowerCase() // Get text after /devices, convert to lowercase

    if (message === 'list') {
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
  dashboard.sm.listDevices(MERAKI_NET_ID)
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
