const jwt = require('jsonwebtoken');

const defaultMessage = require('./../utils/defaultMessage');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) {
        res.status(401).send(
            defaultMessage(401, null, 'Unauthorized!')
        );
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) {
            res.status(403).send(
                defaultMessage(403, null, 'Forbiden!')
            );
        }

        req.email = decoded.email;
        next();
    })
}

module.exports = verifyToken;