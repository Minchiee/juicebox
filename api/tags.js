const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require('../db');

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next(); // THIS IS DIFFERENT
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  // read the tagname from the params
  const {tag} = req.body;
  try {
    const post = await getPostsByTagName(tag);
    // send out an object to the client { posts: // the posts }
    res.send(post)
  } catch ({ name, message }) {
    // forward the name and message to the error handler
    next({name,message}
    )
  }
});

postsRouter.delete('/:postId', requireUser, async (req, res, next) => {
  try {
    const post = await getPostById(req.params.postId);

    if (post && post.author.id === req.user.id) {
      const updatedPost = await updatePost(post.id, { active: false });

      res.send({ post: updatedPost });
    } else {
      // if there was a post, throw UnauthorizedUserError, otherwise throw PostNotFoundError
      next(post ? { 
        name: "UnauthorizedUserError",
        message: "You cannot delete a post which is not yours"
      } : {
        name: "PostNotFoundError",
        message: "That post does not exist"
      });
    }

  } catch ({ name, message }) {
    next({ name, message })
  }
});

tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags();
  
    res.send({
      tags
    });
  });

module.exports = tagsRouter;