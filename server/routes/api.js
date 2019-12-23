const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const db = "mongodb+srv://josh:windows@cluster0-dymgv.mongodb.net/test?retryWrites=true&w=majority"

const Event = require('../models/event')
const User = require('../models/user');


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://josh:windows@cluster0-dymgv.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

mongoose.connect(db, { useNewUrlParser: true });

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}

router.get('/events', async (req,res) => {
  const events = await Event.find({});
  res.json(events);
})

router.get('/special', verifyToken, (req, res) => {
  let specialEvents = [
    {
      "_id": "1",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(specialEvents)
})

router.post('/events', (req, res) => {
  const event = new Event(req.body)
  event.save((err, savedEvent) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).send(savedEvent)
    }
  })
})

router.post('/register', (req, res) => {
  User.findOne({email: req.body.email}, (er, userTemp) => {
    if (!!userTemp) {
      res.status(401).send('Email is being used')
    } else {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          const userData = {
            email: req.body.email,
            password: hash
          }
          const user = new User(userData)
          console.log(user)
          user.save((err, registeredUser) => {
            if (err) {
              console.log(err)      
            } else {
              let payload = {subject: registeredUser._id}
              let token = jwt.sign(payload, 'secretKey')
              res.status(200).send({token})
            }
          })
        });
      });
    }
  })
})

router.post('/login', (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (!user) {
      res.status(401).send('Invalid Email/Password Combo')
    } else {
      bcrypt.compare(req.body.password, user.password, function(err, resBoolean) {
        if (err) {
          console.log(err)    
        } else { 
          if (!resBoolean) {
            res.status(401).send('Invalid Email/Password Combo')
          } else {
            let payload = {subject: user._id}
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
          }
        }
      })
    }
  })
})

router.get('/users', async (req, res) => {
  const users = await User.find({});
  res.json(users);
})

module.exports = router;