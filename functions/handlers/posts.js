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
      userHandle: req.body.userHandle,
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
        return db
          .collection('comments')
          .orderBy('createdAt', 'desc')
          .where('postId', '==', req.params.postId)
          .get();
      })
  };