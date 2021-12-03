const functions = require("firebase-functions");
const app = require('express')();

const cors = require('cors');
app.use(cors());

const { db } = require('./util/admin');

const {
    getAllPosts,
    createPost,
    getPost,
  } = require('./handlers/posts');
  
// Post routes
app.get('/posts', getAllPosts);
app.post('/post', createPost);
app.get('/post/:postId', getPost);

// const {
//     signup,
//     login,
//     addUserDetails,
//     getAuthenticatedUser,
//     getUserDetails
//   } = require('./handlers/users');

exports.api = functions.region('us-central1').https.onRequest(app);