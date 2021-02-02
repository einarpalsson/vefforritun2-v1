const express = require('express');

const videoRouter = express.Router();
// const app = express();
module.exports = videoRouter;
const data = require('../videos.json');

function timestamp(duration) {
  if (duration >= 3600) {
    const klst = duration / 3600;
    const klstNamundad = Math.floor(klst);
    const minutur = klstNamundad * 60;
    const afgangur = duration - klstNamundad * 3600;
    const afgangurIMinutum = afgangur / 60;
    const afgangurNamundað = Math.floor(afgangurIMinutum);
    const sekundur = afgangur - afgangurNamundað * 60;
    let timaStrengur = `${minutur + afgangurNamundað}:${sekundur}`;
    if (sekundur < 10) {
      timaStrengur = `${minutur + afgangurNamundað}:0${sekundur}`;
    }
    return timaStrengur;
  }
  return new Date(duration * 1000).toISOString().substr(14, 5);
}

function dateCreated(created) {
  const today = new Date();
  const date = new Date(created);
  const difference = (today.getTime() - date.getTime()) / 1000;

  const months = Math.ceil((difference / (1000 * 60 * 60)) % 60);
  /* eslint-disable */
  return 'Fyrir ' + months + ' mánuðum síðan';

  /* eslint-enable */
}

videoRouter.get('/', (req, res) => {
  res.render('index', {
    json: data,
    title: 'Fræðslumyndbandaleigan',
    timestamp,
    dateCreated,
  });
});

videoRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const idInt = parseInt(id, 10);
  const found = data.videos.some((video) => {
    if (video.id === idInt) {
      return true;
    }
    return false;
  });
  if (found) {
    res.render('video.ejs', {
      json: data,
      title: data.videos[id - 1].title,
      id,
    });
  } else {
    res
      .status(404)
      .render('404.ejs', { title: '404', error: 'Villa við að sækja gögn' });
  }
});
