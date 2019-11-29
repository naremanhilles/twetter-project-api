const jwt = require('jsonwebtoken');
const Boom = require('boom');
const { SEND_EMAIL } = require('../queues')
const { getChannel, passwordUtil } = require('../utils')
const {
  authenticated
} = require('../database/knex/models');
const { SECRET_KEY } = require('../config')

const sign_up = async (req, res, next) => {
  try {
    let { email, password, name, mobile, user_type } = req.body
    name = name ? name : email.split('@')[0]
    const hash = await passwordUtil.hashed(password);
    const user_info = {
      name, email, password: hash, mobile,
      createdAt: new Date(), user_type: user_type ? user_type : 'user'
    }
    const userID = await authenticated.create(user_info)
    const token = jwt.sign({ id: userID[0].id, email, user_type: user_type ? user_type : 'user' }, SECRET_KEY);
    const user = {
      id: userID[0].id,
      name,
      email,
      mobile,
      token
    }
    const channel = await getChannel();
    channel.sendToQueue(SEND_EMAIL, Buffer.from(JSON.stringify(user)));
    res.cookie('twitterToken', token).json({ success: true, user })
  } catch (error) {
    console.log({ error });
    next(Boom.unauthorized('this email is aready taken'))
  }
};
const activate = async (req, res, next) => {
  let { id } = req.params;
  try {
    await authenticated.activate(id);
    res.json({ success: true })
  } catch (error) {
    console.error
  }
}

const login = async (req, res, next) => {
  try {
    const {
      email,
      password
    } = req.body;
    const user = await authenticated.get(email)
    if (user.length === 0) throw new Error('email dosent have an account, please signup')
    const token = jwt.sign({ id: user[0].id, email: user[0].email, user_type: user[0].user_type }, SECRET_KEY);
    if (!user[0].is_active) throw new Error('your account is not activve please check your email to activate it')
    const is_Matched = await passwordUtil.comparePasswords(password, user[0].password);
    if (!is_Matched) throw new Error('passoword not correct')

    res.cookie('twitterToken', token).json({
      success: true,
      user: {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        mobile: user[0].mobile,
        token
      },
    })
  } catch (error) {
    next(Boom.unauthorized(error))
  }
};
const logout = (req, res) => {
  res.clearCookie('twitterToken').json({ success: true })
}

module.exports = {
  login, activate, sign_up, logout
};