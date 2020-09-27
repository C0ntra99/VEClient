const express = require('express');
const router = express.Router();
const Engine_helper = require('../helpers/Engine_helper')

const Helper = new Engine_helper();


router.post('/register', async (req, res) => {
    let result = await Helper.register_instance(req);
    return res.json(result)
})

module.exports = router