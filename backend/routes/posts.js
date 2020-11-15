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

router.post('/create-post', async (req, res) => {
    const tip = new Post({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        authorId: req.body.authorId,
        created: req.body.created,
        likeCount: req.body.likeCount,
        isLiked: false,
        department: req.body.department,
        class: req.body.class
    });

    tip.save().then(data => {
        res.json({success: true, tip: data});
    }).catch(err => {
        res.json({success: false, user: null});
    });
});

router.put('/:id', async (req, res) => {
    let post = await Post.findOne({_id: req.params.id});

    post.title = req.body.title;
    post.body = req.body.body,
    post.author = req.body.author,
    post.authorId =  req.body.authorId,
    post.created = req.body.created,
    post.likeCount = req.body.likeCount,
    post.isLiked = false,
    post.department = req.body.department,
    post.class = req.body.class

    await post.save().then((data) => {
        res.send({success: true, message: "Updated!"});
    }).catch(err => {
        res.send({success: false, message: err});
    });
});

router.get('/:id', async (req, res) => {
    let post = await Post.find({_id: req.params.id});
    res.send(post);
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