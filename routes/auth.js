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
              console.log(user);
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

module.exports = router;
