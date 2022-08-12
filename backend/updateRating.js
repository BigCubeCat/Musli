const Song = require('./models/Song');

function getTrueCombination(rates) {
  if (rates === []) {
    rates = [0, 0, 0, 0, 0, 0, 0, 0]
  }
  const popular = [
    { index: 0, rate: rates[0] }, { index: 1, rate: rates[1] }
  ];
  for (let i = 2; i < 8; i++) {
    for (let j = 0; j < 2; j++) {
      if (popular[j].rate < rates[i]) {
        popular[j] = { index: i, rate: rates[i] };
        break;
      }
    }
  };
  return popular[0].index + "" + popular[1].index
}

async function updateRating() {
  let page = 0;
  const limit = process.env.UPDATE_LIMIT; // для экономии памяти читаем по страницам
  let songs;
  let needContinue = true;
  while (needContinue) {
    songs = await Song.find().skip(page * limit).limit(limit).exec();
    needContinue = songs.length === limit;
    for (let song of songs) {
      const trueCombination = getTrueCombination(song.rates);
      await Song.updateOne({ _id: song._id }, { combination: trueCombination }).exec();
    };
    page = page + 1;
  };
}

module.exports = updateRating;

