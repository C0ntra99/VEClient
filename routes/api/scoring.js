const express = require('express');
const router = express.Router();
const logger = require('../../plugins/logger');
const Engine = require('../../app/index')

const VEEngine = new Engine


//Verify instance hasnt gone over time
router.get('/', async (req, res) => {
    logger.debug({label:`scoring[get]`, message:`Score request from server`})
    current_time = new Date()
    //let result = {status:200, message:{
    //    score:Math.floor(Math.random() * 100),
    //    time:current_time.getTime() 
    //}}
    let newScore = await VEEngine.score('/Users/ethanfowler/Projects/VEClient/app/engine_config_template.json')
    logger.debug({label:`scoring[get]`, message:`NewScore: ${newScore}`})
    return res.json({status:200, message:{score:newScore, time:current_time.getTime()}})
});

module.exports = router;