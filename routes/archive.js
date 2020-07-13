const express = require('express');
const router = express.Router();
const moment = require('moment');
moment.locale('en');

const config = require('../config');
const models = require('../models');

async function posts(req, res) {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const perPage = +config.PER_PAGE;
  const page = req.params.page || 1;

  try {
    const posts = await models.Post.find({})
      .skip(perPage * page - perPage)
      .limit(perPage)
      .populate('owner')
      .sort({ createdAt: -1 });

    const count = await models.Post.countDocuments();

    const commentsCount = await models.Comment.find({

    });

    res.render('index', {
      posts,
      current: page,
      commentsCount: 3,
      pages: Math.ceil(count / perPage),
      user: {
        id: userId,
        login: userLogin
      }
    });

  } catch (error) {
    throw new Error('Server Error');
  }
}

router.get('/', (req, res) => posts(req, res));
router.get('/archive/:page', (req, res) => posts(req, res));

router.get('/posts/:post', async (req, res, next) => {
  const url = req.params.post.trim().replace(/ +(?= )/g, '');
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;

  if (!url) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  } else {
    try {
      const post = await models.Post.findOne({
        url
      });
      if (!post) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
      } else {
        const author = await models.User.findOne({
          _id: post.owner
        });
        const comments = await models.Comment.find({
          post: post.id,
          parent: { $exists: false }
        });
        res.render('post/post', {
          post,
          comments,
          moment,
          author: author.login,
          user: {
            id: userId,
            login: userLogin
          }
        });
      }
    } catch (error) {
      throw new Error('Server Error');
    }
  }
});

// users posts
router.get('/users/:login/:page*?', async (req, res) => {
  const userId = req.session.userId;
  const userLogin = req.session.userLogin;
  const perPage = +config.PER_PAGE;
  const page = req.params.page || 1;
  const login = req.params.login;

  try {
    const user = await models.User.findOne({
      login
    });

    const posts = await models.Post.find({
      owner: user.id
    })
      .skip(perPage * page - perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    const count = await models.Post.count({
      owner: user.id
    });

    res.render('archive/user', {
      posts,
      _user: user,
      current: page,
      pages: Math.ceil(count / perPage),
      user: {
        id: userId,
        login: userLogin
      }
    });

  } catch (error) {
    throw new Error('Server Error');
  }

});

module.exports = router;
