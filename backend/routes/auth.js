const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    // check if user exists
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(400).send('Email already exists');

     // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        pid: req.body.pid
    });

    user.save().then(data => {
        res.json({success: true, user: data});
    }).catch(err => {
        res.json({success: false, user: null});
    });
});

router.post('/login', async (req, res) => {

    // check if email exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send({success: false, message:'Email does not exist'});

    // password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send({success: false, message: 'Invalid Password'});

    req.session.user = user;

    res.send({success: true, user: user}).status(200);


});

router.get('/logged-in', (req, res) => {
    console.log(req.session.user);
    if(req.session.user) {
        res.send(true);
    }
    res.send(false);
})

router.get('/logout', (req, res) => {
    delete req.session.user;
    res.send({success: true, message: "Logged out!"});
});

router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
})


module.exports = router;