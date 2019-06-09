const jwt = require('jsonwebtoken')
const invalidToken = require('../model/InvalidToken')

const TOKEN_SECRET = "3p9n5v923u-5i1x3;tk4pu634wu3jtoi3joitewhiun6";

module.exports = class {

    // verify the token
    static verifyToken (token) {
        return new Promise((resolve, reject) => {
            if (token === null || token === "") return reject('Token was not provided');
   
            jwt.verify(token, TOKEN_SECRET, { algorithms: ['HS512'] }, (err, user) => {
                if (err) {
                    console.error(err);
                    return reject('Token is not valid');
                }

                invalidToken.findOne({ content: token }, (err, res) => {
                    if (err) return console.error(err)
                    return (res === null) ? resolve(user.sub) : reject('Token is not valid');
                })
            });
        })
    }

    // decode the token
    static decodeToken (token) {
        
    }
}