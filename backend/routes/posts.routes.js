const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      // .select('author created title photo')
      .sort({created: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts', async (req,res) => {
  try {
    const {author, created, updated, status, title, text, photo, phone, price, location } = req.body;
    const newPost = new Post ({ author: author, created: created, updated: updated, status: status, title: title, text: text, photo: photo, phone: phone, price: price, location: location });
    await newPost.save();
    res.json(newPost);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/posts/:id', async (req,res) => {
  try {
    const post = await(Post.findById(req.params.id));
    if(post) {
      await Post.deleteOne({ _id: req.params.id });
      res.json(post);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.put('/posts/:id', async (req,res) => {
  const {title, text, photo, phone, price, location, update, author, created, status} = req.body;

  try {
    await Post.updateOne({ _id: (req.params.id) }, { $set: { title: title, text: text, photo: photo, phone: phone, price: price, location: location, update: update, author: author, created: created, status: status } });
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});


module.exports = router;
