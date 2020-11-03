const router = require('express').Router();

router.get('/register', (req, res) => {
    res.send('registering....')
});

module.exports = router;