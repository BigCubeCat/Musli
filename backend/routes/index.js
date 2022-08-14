const { log } = require('console');
var express = require('express');
const path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:filename', function(request, response) {
  console.log('here')
  try {
    const fileName = process.cwd() + "/public/audio/" + request.params.filename
    console.log(fileName)
    response.sendFile(fileName);
  } catch (err) {
    console.log(err)
    response.error(500).send(error);
  }
})

module.exports = router;
