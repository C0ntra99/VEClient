const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    let result = {status:200, messsag:"Hello World!"}
    return res.json(result)
});

module.exports = router;