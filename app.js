const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://mollfar:pedro1965@spaceship.whelghk.mongodb.net/spaceship', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error'));
db.once('open', () => console.log('connection successed'));
const postSchema = new mongoose.Schema({
  body: mongoose.SchemaTypes.String,
  author: mongoose.SchemaTypes.String,
});
const postModel = mongoose.model('posts', postSchema);

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/posts', async (req, res) => {
  const posts = await postModel.find({});
  res.json({ posts });
})

app.get('/posts/:id', async (req, res) => {
  const post = await postModel.findOne({_id: req.params.id});
  res.json({ post });
})

app.post('/posts', async (req, res) => {
  const postData = req.body;
  console.log('postData----', postData);
  const newPost = new postModel(postData);
  await newPost.save();
  res.status(201).json({ message: 'Stored new post.', post: postData });
})

app.listen(8080);
