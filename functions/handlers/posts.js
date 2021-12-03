const { db } = require('../util/admin');

exports.getAllPosts = (req, res) => {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .get()
      .then((data) => {
        let posts = [];
        data.forEach((doc) => {
          posts.push({
            postId: doc.id,
            body: doc.data().body,
            userHandle: doc.data().userHandle,
            createdAt: doc.data().createdAt,
            likeCount: doc.data().likeCount,
          });
        });
        return res.json(posts);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.code });
      });
};

exports.createPost = (req, res) => {
const newPost = {
    body: req.body.body,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString(),
    likeCount: 0,
};

db.collection('posts')
    .add(newPost)
    .then((doc) => {
    const resPost = newPost;
    resPost.postId = doc.id;
    res.json(resPost);
    })
    .catch((err) => {
    res.status(500).json({ error: 'something went wrong' });
    console.error(err);
    });
};

exports.getPost = (req, res) => {
    let postData = {};
    db.doc(`/posts/${req.params.postId}`)
        .get()
        .then((doc) => {
        if (!doc.exists) {
            return res.status(404).json({ error: 'post not found' });
        }
        postData = doc.data();
        postData.postId = doc.id;
        })
        .then(() => {
            return res.json(postData);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
          });
};

exports.likePost = (req, res) => {
    const likeDocument = db
        .collection('likes')
        .where('userHandle', '==', req.user.handle)
        .where('postId', '==', req.params.postId)
        .limit(1);

    const postDocument = db.doc(`/posts/${req.params.postId}`);

    let postData;

    postDocument
        .get()
        .then((doc) => {
        if (doc.exists) {
            postData = doc.data();
            postData.postId = doc.id;
            return likeDocument.get();
        } else {
            return res.status(404).json({ error: 'post not found' });
        }
        })
        .then((data) => {
        if (data.empty) {
            return db
            .collection('likes')
            .add({
                postId: req.params.postId,
                userHandle: req.user.handle
            })
            .then(() => {
                postData.likeCount++;
                return postDocument.update({ likeCount: postData.likeCount });
            })
            .then(() => {
                return res.json(postData);
            });
        } else {
            return res.status(400).json({ error: 'post already liked' });
        }
        })
        .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.code });
        });
    };