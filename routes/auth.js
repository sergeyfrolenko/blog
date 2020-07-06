const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');

const models = require('../models');

// POST is authorized
router.post('/register', (req, res) => {
  const login = req.body.login;
  const pass = req.body.pass;
  const passCheck = req.body.passCheck;

  if (!login || !pass || !passCheck) {
    res.json({
      ok: false,
      error: 'all fields must be fill',
      fields: ['login', 'pass', 'passCheck']
    });
  } else if (login.length < 3 || login.length > 16) {
    res.json({
      ok: false,
      error: 'length login 3-16 symbols',
      fields: ['login']
    });
  } else if (pass !== passCheck) {
    res.json({
      ok: false,
      error: 'passwords not equal',
      fields: ['pass', 'passCheck']
    });
  } else {
   models.User.findOne({
      login
    }).then(user => {
      if (!user) {
        bcrypt.hash(pass, null, null, (err, hash) => {
          models.User.create({
            login,
            password: hash
          })
            .then(user => {
              req.session.userId = user.id;
              req.session.userLogin = user.login;
              res.json({
                ok: true
              });
            })
            .catch(err => {
              console.log(err);
              res.json({
                ok: false,
                error: 'error, try later!'
              });
            });
        });
      } else {
        res.json({
          ok: false,
          error: 'login alredy exist!',
          fields: ['login']
        });
      }
    });
  }
});
router.post('/login', (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  if (!login || !password) {
    const fields = [];
    if (!login) fields.push('login');
    if (!password) fields.push('password');

    res.json({
      ok: false,
      error: 'all fields must be fill',
      fields
    });
  } else {
    models.User.findOne({
      login
    })
      .then(user => {
        if (!user) {
          res.json({
            ok: false,
            error: 'Логин и пароль неверны!',
            fields: ['login', 'password']
          });
        } else {
          bcrypt.compare(password, user.password, function(err, result) {
            if (!result) {
              res.json({
                ok: false,
                error: 'Логин и пароль неверны!',
                fields: ['login', 'password']
              });
            } else {
              req.session.userId = user.id;
              req.session.userLogin = user.login;
              res.json({
                ok: true
              });
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.json({
          ok: false,
          error: 'Ошибка, попробуйте позже!'
        });
      });
  }
});
// GET for logout
router.get('/logout', (req, res) => {
  if (req.session) {
    // delete session object
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
