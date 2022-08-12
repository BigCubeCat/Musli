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
  // TODO: update rates
  try {
    const user = request.user;
    const { song_id, rate } = request.body;
    const song = await Song.findById(song_id).exec();

    const indexes = [+rate[0], +rate[1]]

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
      const oldIndexes = [+oldRate.rate[0], +oldRate.rate[1]];
      const newRates = song.rates.map((r, i) => {
        if (indexes.includes(i)) {
          if (!oldIndexes.includes(i)) {
            return r + 1;
          }
          return r;
        }
        if (oldIndexes.includes(i)) {
          return r - 1;
        }
        return r;
      })

      Song.updateOne({ _id: song_id }, { rates: newRates }).exec()
      response.send({ status: 'ok' })
    } else {
      const dbRate = new Rate({
        user: user.email, song: song_id,
        rate: rate
      });
      await dbRate.save();

      const newRates = song.rates.map((r, i) => {
        if (indexes.includes(i)) {
          return r + 1;
        }
        return r;
      })
      Song.updateOne({ _id: song_id }, { rates: newRates }).exec()
      response.send({ status: 'ok' });
    }
  } catch (error) {
    console.error(error)
    response.status(500).send(error);
  }
})

module.exports = router
