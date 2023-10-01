const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')

router.get('/users', (req, res) => {
    const userData = [{
        "id": 'hi'
    }]
    res.send(userData)
}
)

module.exports = router