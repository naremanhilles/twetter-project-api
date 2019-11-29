const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config')
const verifyToken = async (req, res, next) => {
    if (req.headers.token === undefined) {
        res.json({ success: false, message: 'Validation Token error' })
    } else {
        jwt.verify(req.headers.token, SECRET_KEY, (err, decoded) => {
            if (err) {
                res.json({ success: false, message: 'Validation Token error' })
            } else {
                req.user = decoded;
                next();
            }
        });
    }
}
module.exports = verifyToken;