////////////////////////// VALIDATIONS ///////////////////////////

function validateUsername(req, res, next) {
    users.findAll({
        where: {
            username: req.body.username
        }
    }).then(function (users) {
        if (users[0]) {
            res.status(401).json("Username already in use")
        } else {
            return next();
        }
    });
}

function validateEmail(req, res, next) {
    users.findAll({
        where: {
            email: req.body.email
        }
    }).then(function (users) {
        if (users[0]) {
            res.status(401).json("Email already in use")
        } else {
            return next();
        }
    });
}

function validateProduct(req, res, next) {
    products.findAll({
        where: {
            name: req.body.name
        }
    }).then(function (products) {
        if (products[0]) {
            res.status(401).json("Product already created")
        } else {
            return next();
        }
    });
}

function auth(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const validData = jwt.verify(token, signature);
        console.log(validData);
        if (validData) {
            req.userData = validData;
            next();
        }
    } catch (err) {
        res.status(401).json("You must provide a valid token");
    }
}

function admin(req, res, next) {
    let isAdmin = req.userData.is_admin
    if (isAdmin === true) {
        next()
    } else {
        res.status(401).json("You must be an admin");
    }
}



module.exports = {
    validateUsername,
    validateEmail,
    validateProduct,
    auth,
    admin
};