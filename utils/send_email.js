const nodemailer = require('nodemailer');
const { CLIENT_PASS, CLIENT_EMAIL } = require('../config')

async function main(user_data) {
    let { id, name, email } = user_data;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: CLIENT_EMAIL,
            pass: CLIENT_PASS
        }
    });
    let info = await transporter.sendMail({
        from: 'TWITTER 👻',
        to: email,
        subject: 'Activate user ✔',
        html: `
        <h2>HI ${name}</h2>
        <p>please click <a href=/activate-user/${id}>here</a> to activate your account </p>
        `
    });
}

module.exports = main