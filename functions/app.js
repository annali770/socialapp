var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http');
var server = http.createServer(app);

const {
    getAllPosts,
    createPost,
    getPost,
    likePost
  } = require('./handlers/posts');

const {
    signup,
    login,
    getAuthenticatedUser
  } = require('./handlers/users');



app.post('/signup', signup);
app.use(bodyParser());

server.listen(8000);