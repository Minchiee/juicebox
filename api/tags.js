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

tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags();
  
    res.send({
      tags
    });
  });

module.exports = tagsRouter;