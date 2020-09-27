const express = require('express');
const router = express.Router();
const logger = require('../../plugins/logger');

//Verify instance hasnt gone over time
router.get('/', async (req, res) => {
    logger.debug({label:`scoring[get]`, message:`Score request from server`})
    current_time = new Date()
    let result = {status:200, message:{
        score:Math.floor(Math.random() * 100),
        time:current_time.getTime() 
    }}
    return res.json(result)
});

module.exports = router;