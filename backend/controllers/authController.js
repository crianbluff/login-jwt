const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const helpersValidPassword = require('../lib/helpers');
const User = require('../models/User');
const CONFIG = require('../config/config');

function register (req, res) {
  const today = new Date();
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today
  }

  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    if (!user) {
      userData.password = helpersValidPassword.encryptPassword(userData.password);
      User.create(userData)
      .then(
        user => {
          jwt.sign(user.dataValues, CONFIG.SECRET_TOKEN, {expiresIn: CONFIG.TIME_EXP_TOKEN }, function(error, token) {
            if (error) {
              res.status(500).send({error});
            } else {
                res.status(201).send({token});
              }
          });
        }
      )
      .catch(err => {
        res.status(500).send({err});
      });
    } else {
        res.status(409).send({message: 'El Usuario Ya Existe'});
      }
  })
  .catch(err => {
    res.status(500).send({err});
  });

};

function login (req, res) {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(
    user => {
      if (!user) {
        res.status(404).send({message: 'El usuario no existe'});
      }
      bcrypt.compare(req.body.password, user.password)
      .then( match => {
        if (match) {
          jwt.sign(user.dataValues, CONFIG.SECRET_TOKEN, {expiresIn: CONFIG.TIME_EXP_TOKEN }, function(error, token) {
            if (error) {
              res.status(500).send({error});
            } else {
                res.status(200).send({message: 'Acceso', token});
              }
          });
        } else {
            res.status(401).send({message: 'Password incorrecta'});
          }
      })
      .catch( err => {
        res.status(500).send({err});
      });
    }
  )
  .catch( err => {
    res.status(500).send({err})
  });
}

function profile (req, res) {
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, CONFIG.SECRET_TOKEN, function(error, decoded) {
      if (error) {
        res.status(403).send({message: 'Token invalido', error});
      } else {
          User.findOne({
            where: {
              id: decoded.id
            }
          })
          .then(
            user => {
              if (user) {
                res.status(200).send({user});
              } else {
                  res.status(404).send({message: 'El usuario no existe'});
                }
            }
          )
          .catch( err => {
            res.status(500).send({err});
          });
        }
    });
  } else {
      res.status(403).send({message: 'No enviaste el token'});
    }
}

module.exports = {
  register,
  login,
  profile
};