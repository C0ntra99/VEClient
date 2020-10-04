const express = require('express');
const router = express.Router();
const Engine_helper = require('../helpers/Engine_helper')
const Helper = new Engine_helper();


//THE ID NEEDS TO BE STORED TO REFERENCE LATER
//PROBABLY A POOR WAY TO DO THIS
router.post('/register', async (req, res) => {
    let result = await Helper.register_instance(req);

    return res.json(result)
})

module.exports = router