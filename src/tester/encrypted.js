

//SIGNATURE JWT
const bcryptjs = require('bcryptjs');


bcryptjs.genSalt(10, function (err, salt) {
    bcryptjs.hash("user", salt, function (err, hash) {
        console.log("El passowrd encriptado es : " + hash);
    })
});