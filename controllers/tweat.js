const uuid = require('uuid/v4');

const { tweat, authenticated } = require('../database/knex/models');

const createTweat = async (req, res) => {
  let { id } = req.user;
  const { text } = req.body;
  let photo = req.files ? req.files.photo : null;
  let photoName
  if (photo) {
    const photoNameArr = photo.name.split('.');
    const photoType = photoNameArr[photoNameArr.length - 1];
    photoName = `${uuid()}.${photoType}`
    req.files.photo.mv(
      __dirname + `/../uploads/${uuid()}.${photoType}`,
      function (err) {
        if (err) res.status(500).send(err);

        res.send('File uploaded!');
      }
    );
  }
  await tweat.create({
    user_id: id,
    text,
    photo: photoName ? photoName : null,
    createdAt: new Date()
  })
  res.json({ success: 'true' })
};
const viewTweat = async (req, res) => {
  const tweats = await tweat.view_all();
  es.json({
    success: true,
    tweats
  })
}
const deleteTweat = async (req, res, next) => {
  const { id } = req.params;
  const { user_type, id: userId } = req.user
  const tweata = tweat.view(id)
  if (user_type === 'suprUser' || userId == tweata[0].userId) {
    await tweat.delete_tweat(id)
    res.json({
      success: true,
    })
  }
  res.json({
    success: false,
    response: 'you cant delete this tweat'
  })
}
module.exports = {
  createTweat, deleteTweat, viewTweat
};
