
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const token = req.headers['token-key']

    jwt.verify(token, process.env.JWT_SECRATE, function (error, decoded) {
        if (error) {
            res.status(400).json({ msg: "unauthorize access token", error: error })
        } else {

            let username = decoded['payload']["data"]["UserName"]
            req.headers.username = username

            next()
        }
    })

}