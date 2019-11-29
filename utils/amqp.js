const amqp =  require('amqplib');

const { SEND_EMAIL } = require('../queues');

let connection, channel;

const getConnection = async () => {
  try {
    if (connection) return Promise.resolve(connection);
    connection = await amqp.connect('amqp://localhost');

    return Promise.resolve(connection);
  } catch (err) {
    return Promise.reject(err);
  }
};

const getChannel = async (conn) => {
  try {
    if (channel) return Promise.resolve(channel);
    channel = await conn.createChannel();
    channel.assertQueue(SEND_EMAIL, { durable: true });
    return Promise.resolve(channel);
  } catch (err) {
    return Promise.reject(err);
  }
};

dd = async () => {
  try {
    if (!connection) connection = await getConnection();

    if (channel) return Promise.resolve(channel);

    if (!channel) channel = await getChannel(connection);

    return Promise.resolve(channel);
  } catch (err) {
    return Promise.reject(err);
  }
};
module.exports = dd