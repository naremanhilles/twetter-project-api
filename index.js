const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const controllers = require('./controllers');
const cookieParser = require('cookie-parser');
// var cors = require('cors');
var crashpad = require('crashpad');
const { errors } = require('celebrate');
const { SEND_EMAIL } = require('./queues')
const app = express();
const { getChannel, sendEmail } = require('./utils')

app
  .use('/', express.static(`${__dirname}/public/app/build`))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  // .use(cors())
  .use(fileUpload())
  .use('/api', controllers)
  .use(errors())
  .use(crashpad());

const port = process.env.PORT || 8888;
getChannel().then((channel)=>{
  channel.consume(SEND_EMAIL, async function(user) {
    const user_data = JSON.parse(user.content.toString())
     sendEmail(user_data).then((resss) => {
    }).catch(console.error);
  }, {
    noAck: true
  });
})
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
