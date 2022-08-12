const express = require('express')
const Song = require('../models/Song')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', async (req, res) => {
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
    const song = await Song.findOne({
      name: { $regex: '.*' + req.body.name + '.*' } // "LIKE"
    }).exec();
    res.send({ song })
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

module.exports = router
