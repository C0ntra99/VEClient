//Load config
const Config = require('./config/config')
const logger = require('./plugins/logger')
const cron = require('node-cron')

//Express 
const express = require('express')
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 8081

//Engine logic
const cron = require('node-cron')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

Config.endpoints.map((local_app) => {
    app.use(local_app.route, require(local_app.app_path))
});

app.listen(port, () => {
    logger.info({label:`main`, message:`Starting client on port ${port}`})
})