require('dotenv').config({ path: __dirname + '/.env' })
const { HOST, USERS, PASSWORD, DATABASE, SECRET_KEY, CLIENT_EMAIL, CLIENT_PASS } = process.env

module.exports = {
    HOST, USERS, PASSWORD, DATABASE, SECRET_KEY, CLIENT_EMAIL, CLIENT_PASS
};

