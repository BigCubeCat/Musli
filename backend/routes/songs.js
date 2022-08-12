const express = require('express')
const Song = require('../models/Song')
const Rate = require('../models/Rate')
const auth = require('../middleware/auth')
const { request, response } = require('express')

const router = express.Router()

router.post('/', auth, async (req, res) => {
  // Create a new user
  try {
    const song = new Song(req.body)
    await song.save()
    res.status(201).send({ song })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/name', async (req, res) => {
  // Log user out of the application
  try {
    const songs = await Song.find({
      name: { $regex: '.*' + req.body.name + '.*' } // "LIKE"
    }).exec();
    res.send({ songs })
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/combination', async (request, response) => {
  try {
    const { limit, page, combination } = request.body;
    const songs = await Song.find({ combination: combination })
      .skip(limit * page).limit(limit).exec();
    response.send({ songs });
  } catch (error) {
    response.status(500).send(error);
  }
})

router.delete("/", auth, async (request, response) => {
  try {
    const { name } = request.body;
    Song.findOneAndRemove({
      name: { $regex: '.*' + name + '.*' } // "LIKE"
    });
    response.send({ status: 'ok' })
  } catch (error) {
    response.status(500).send(error);
  }
})

router.post('/rate', auth, async (request, response) => {
  try {
    const user = request.user;
    const { song_id, rate } = request.body;
    const oldRate = await Rate.findOne({
      user: user.email, song: song_id
    }).exec();
    if (oldRate !== null) {
      Rate.updateOne({
        user: user.email, song: song_id
      },
        {
          rate: rate
        }).exec();
      response.send({ status: 'ok' })
    } else {
      const rate = new Rate({
        user: user.email, song: song_id,
        rate: rate
      });
      await rate.save();
      response.send({ status: 'ok' });
    }
  } catch (error) {
    response.status(500).send(error);
  }
})

module.exports = router
