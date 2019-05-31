const jwt = require('jsonwebtoken')
const invalidToken = require('../model/InvalidToken')

const TOKEN_SECRET = "3p9n5v923u-5i1x3;tk4pu634wu3jtoi3joitewhiun6";

module.exports = class {

    // verify the token
    static verifyToken (token) {
        return new Promise((resolve, reject) => {
            if (token === null || token === "") reject('Token was not provided');
   
            jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
                if (err) reject('Token is not valid');

                invalidToken.findOne({ content: token }).then(res => {

                    return (res === null) ? resolve() : reject('Token is not valid');

                }).catch(err => console.error(err));

            });
        })
    }
}