const router = require('express').Router();
const Post = require('../models/Post');

router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.send(posts);
});

router.get('/department-list', async (req, res) => {
    const posts = await Post.find();
    const departments = posts.map((post) => post.department);
    const uniqueDepartments = [... new Set(departments)];
    res.send(uniqueDepartments);
});

router.get('/:department/class-list', async (req, res) => {
    let department = req.params.department;

    const posts = await Post.find({department: department});
    const classes = posts.map((post) => post.class);
    const uniqueClasses = [... new Set(classes)];
    res.send(uniqueClasses);
});


router.get('/:department', async (req, res) => {
    let department = req.params.department;

    const posts = await Post.find({department: department});
    res.send(posts);
});

router.get('/:department/:class', async (req, res) => {
    let department = req.params.department;
    let _class = req.params.class;
    // const class = 0;

    const posts = await Post.find({department: department}).find({class: _class});
    res.send(posts);
});


module.exports = router;