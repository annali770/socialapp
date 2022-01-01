const functions = require("firebase-functions");
const app = require('express')();
const FBAuth = require('./util/FBAuth');

const { db } = require('./util/admin');

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
  
// Post routes
app.get('/posts', getAllPosts);
app.post('/post', FBAuth, createPost);
app.get('/post/:postId', getPost);
app.get('/post/:postId/like', FBAuth, likePost);

// User routes
app.post('/signup', signup);
app.post('/login', login);
app.get('/user', FBAuth, getAuthenticatedUser);

exports.api = functions.region('us-central1').https.onRequest(app);


console.log(getAllPosts());