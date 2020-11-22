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
    req.session.user ? res.status(200).send(true) : res.send(false);
})

router.get('/logout', (req, res) => {
    delete req.session.user;
    res.send({success: true, message: "Logged out!"});
});

router.get('/curr-user', (req, res) => {
    if(req.session.user) {
        let currUser = {
            name: req.session.user.name,
            id: req.session.user._id,
            email: req.session.user.email,
            pid: req.session.user.pid
        }
        res.send(currUser).status(200);
        return;
    } else {
        res.send('Unauthorized!').status(400);
    }
})

router.get('/', async (req, res) => {
    if(!req.session.user) {
        res.send('Unauthorized!');
        return;
    }
    const users = await User.find();
    res.send(users);
});

router.put('/:id', async (req, res) => {
    if(!req.session.user) {
        res.send('Unauthorized!');
        return;
    }
    const user = await User.findOne({_id: req.params.id});

    user.name = req.body.name;
    user.email = req.body.email;
    user.pid = req.body.pid;

    await user.save().then((data) => {
        req.session.user = data;
        res.send({success: true, message: "success!"});
        return;
    }).catch((err) => {
        res.send({success: false, error: err});
        return;
    });
});


module.exports = router;