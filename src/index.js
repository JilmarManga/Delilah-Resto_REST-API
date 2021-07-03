//Server
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Constants
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.APP_PORT? process.env.APP_PORT: 3000;


//////////////////////////////////// START APP ////////////////////////////////////
app.listen(3000, () => {
    console.log(`delilah_restó app listening at http://localhost:${PORT}`);
});


//SEGURIDAD HELMET
const helmet = require('helmet');
app.use(helmet());
app.disable('x-powered-by');

// Import Controllers
const sequelize = require("./routes/connection");
const users = require('./routes/users');
const products = require('./routes/products');
const orders = require('./routes/orders');
const productOrder = require('./routes/order_details');

//SIGNATURE JWT
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const signature = "Lymd24%EM~FHb*4Q%Bd8"

// //VALIDATIONS
// const validateUsername = require('./validatios/validations');
// const validateEmail = require('./validatios/validations');
// const validateProduct = require('./validatios/validations');
// const auth = require('./validatios/validations');
// const admin = require('./validatios/validations');



////////////////////////// USERS ///////////////////////////


// CREATE NEW USER

app.post("/users", validateUsername, validateEmail, function (req, res) {
    bcryptjs.genSalt(10, function (err, salt) {
        bcryptjs.hash(req.body.password, salt, function (err, hash) {
            users.create({
                username: req.body.username,
                fullname: req.body.fullname,
                surname: req.body.surname,
                email: req.body.email,
                address: req.body.address,
                mobile: req.body.mobile,
                password: hash,
                is_admin: req.body.is_admin
            }).then(function (users) {
                res.status(201).json({
                    "id": users.id,
                    "msg": "User created successfully"
                })
            });
        })
    });
});


// LIST ALL USERS

app.get("/users", auth, function (req, res) {
    let isAdmin = req.userData.is_admin
    let username = req.userData.username
    if (isAdmin === true) {
        users.findAll({
            raw: true,
        }).then(function (users) {
            res.status(200).json(users);
        });
    } else {
        users.findAll({
            raw: true,
            where: {
                username: username
            }
        }).then(function (users) {
            res.status(200).json(users);
        });
    }
})


// LIST USERS

app.get("/users/:id_user", auth, function (req, res) {
    let {
        id_user
    } = req.params;
    let isAdmin = req.userData.is_admin
    let username = req.userData.username
    if (isAdmin === true) {
    users.findAll({
        where: {
            id_user: id
        }
    }).then(function (users) {
        if (users[0]) {
            res.status(200).json(users[0]);
        } else {
            res.status(404).json("No user found")
        }
    });} else {
        users.findAll({
            where: {
                id_user: id,
                username: username
            }
        }).then(function (users) {
            if (users[0]) {
                res.status(200).json(users[0]);
            } else {
                res.status(404).json("Access not allowed")
            }
        });
    }
});

////////////////////////// PRODUCTS ///////////////////////////

// CREATE A NEW PRODUCT

app.post("/products", auth, admin, validateProduct, function (req, res) {
    products.create({
        name: req.body.name,
        price: req.body.price,
        picture: req.body.picture
    }).then(function (products) {
        res.status(201).json({
            "id": products.id,
            "msg": "Product created successfully"
        })
    });
})

// LIST ALL PRODUCTS

app.get("/products", auth, function (req, res) {
    products.findAll({
        raw: true,
    }).then(function (products) {
        res.status(200).json(products);
    });
})


// LIST PRODUCTS

app.get("/products/:id_product", auth, function (req, res) {
    let {
        id_product
    } = req.params;
    products.findAll({
        where: {
             id : id_product
        }
    }).then(function (products) {
        if (products[0]) {
            res.status(200).json(products[0]);
        } else {
            res.status(404).json("No product found");
        }
    });
});


// DELETE PRODUCTS

app.delete("/products/:id_product", auth, admin, function (req, res) {
    let {
        id_product
    } = req.params;
    products.destroy({
        where: {
             id : id_product
        }
    }).then(function (borrado) {
        if (borrado === 0) {
            res.status(404).json("No product found")
        } else {
            res.status(201).json({
                "id": id_product,
                "msg": "Product deleted successfully"
            })
        }
    });
});

// MODIFY PRODUCTS
app.patch("/products/:id_product", auth, admin, function (req, res) {
    let {
        id_product
    } = req.params;
    products.update({
        name: req.body.name,
        price: req.body.price,
        picture: req.body.picture
    }, {
        where: {
            id_product: id_product
        }
    }).then(function (products) {
        if (products[0]) {
            res.status(201).json({
                "id": id_product,
                "msg": "Product updated successfully"
            })
        } else {
            res.status(404).json("No product found")
        }
    });
});


////////////////////////// ORDERS ///////////////////////////

// CREATE A NEW ORDER

app.post("/orders", auth, async function (req, res) {
    const findProducts = await products.findAll({
        raw: true
    });
    var totalOrder = 0
    req.body.products.forEach(element => {
        let productInfo = findProducts.find(product => product.id == element.id_product);
        try{
            console.log('El product info es : '+ JSON.stringify(productInfo))
            totalOrder += (productInfo.price * element.quantity)
        }catch(error){
            res.status(404).json({
                "msg": "No se encontro el producto "+element.id_product
            })
        }
        
    });
    console.log('El resultaaaaa ' + JSON.stringify(req.userData))
    orders.create({
        user_id: req.userData.id_user,
        payment: req.body.id,
        total: totalOrder,
        payment_id: req.body.id_pay_method,
        status_id: 50
    }).then(async function (result) {
        await req.body.products.forEach(element => {
            productOrder.create({
                order_id: result.id,
                product_id: element.id_product,
                quantity: element.quantity
            })
        })
        res.status(201).json({
            "id": result.id,
            "msg": "Order created successfully"
        })
    });
})

// LIST ORDERS

app.get("/orders", auth, function (req, res) {
    let idUser = req.userData.id_user
    let isAdmin = req.userData.is_admin
    if (isAdmin === true) {
    sequelize
        .query(
            `select o.id, u.username username, u.address address, so.status, pm.method, o.total, o.created_at from users u inner join orders o on o.user_id = u.id INNER JOIN status so on so.id = o.id INNER JOIN payment pm on pm.id = o.id order by o.id`, {
                type: sequelize.QueryTypes.SELECT
            }
        )
        .then(results => {
            if (results.length !== 0) {
                req.orderData = results;
                const {
                    orderData
                } = req;
                res.status(201).json({
                    "Orders": orderData
                });
            } else {
                res.status(404).json("There is no order to get");
            }
        });} else {
            sequelize
        .query(
            `select o.id, u.username username, u.address address, so.status, pm.method, o.total, o.created_at 
                from users u
                    inner join orders o on o.user_id = u.id 
                    INNER JOIN status so on so.id = o.status_id
                    INNER JOIN payment pm on pm.id = o.payment_id 
                    where o.user_id = ${idUser} order by o.id`, {
                type: sequelize.QueryTypes.SELECT
            }
        )
        .then(results => {
            if (results.length !== 0) {
                req.orderData = results;
                const {
                    orderData
                } = req;
                res.status(201).json({
                    "Orders": orderData
                });
            } else {
                res.status(404).json("There is no order to get");
            }
        });
        }
})

// LIST PRODUCTS ORDERS

app.get("/orders/:id_order/products", auth, function (req, res) {
    let {
        id_order
    } = req.params;
    let idUser = req.userData.id_user
    let isAdmin = req.userData.is_admin
    if (isAdmin === true){
    sequelize
        .query(
            `select o.id, p.id, p.name, p.price, p.picture, po.quantity from users u inner join orders o on o.user_id = u.id INNER JOIN order_details po on o.id = po.id INNER JOIN products p on p.id = po.id where o.id =${id_order}`, {
                type: sequelize.QueryTypes.SELECT
            }
        )
        .then(results => {
            if (results.length !== 0) {
                req.orderData = results;
                const {
                    orderData
                } = req;
                res.status(201).json({
                    "Products Order": orderData
                });
            } else {
                res.status(404).json("There is no order to get");
            }
        });} else {
            sequelize
            .query(
                `select o.id, p.id, p.name, p.price, p.picture, po.quantity from users u 
                inner join orders o on o.user_id = u.id 
                INNER JOIN order_details po on o.id = po.order_id 
                INNER JOIN products p on p.id = po.product_id
                where o.id =${id_order} and u.id=${idUser}`, {
                    type: sequelize.QueryTypes.SELECT
                }
            )
            .then(results => {
                if (results.length !== 0) {
                    req.orderData = results;
                    const {
                        orderData
                    } = req;
                    res.status(201).json({
                        "Products Order": orderData
                    });
                } else {
                    res.status(404).json("There is no order to get");
                }
            });
        }
})



// DELETE AN ORDER

app.delete("/orders/:id_order", auth, admin, function (req, res) {
    let {
        id_order
    } = req.params;
    orders.destroy({
        where: {
            id: id_order
        }
    }).then(function (borrado) {
        if (borrado === 0) {
            res.status(404).json("No order found")
        } else {
            res.status(201).json({
                "id": id_order,
                "msg": "Order deleted successfully"
            })
        }
    });
});



// CHANGE STATUS ORDERS

app.patch("/orders/:id_order", auth, admin, function (req, res) {
    let {
        id_order
    } = req.params;
    orders.update({
        id_status: req.body.id_status
    }, {
        where: {
            id: id_order
        }
    }).then(function (order) {
        if (order[0]) {
            res.status(201).json({
                "id": id_order,
                "msg": "Order status updated successfully"
            })
        } else {
            res.status(404).json("No order found")
        }
    });
});

////////////////////////// LOGIN ///////////////////////////

app.post("/users/login", function (req, res) {
    users.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user === null) {
            res.status(401).json({
                message: "Invalid credentials!",
            });
        } else {
            bcryptjs.compare(req.body.password, user.password, function (err, result) {
                if (result) {
                    const token = jwt.sign({
                        id_user: user.id,
                        username: user.username,
                        is_admin: user.is_admin
                    }, signature, function (err, token) {
                        res.status(200).json({
                            message: "Authentication successful!",
                            token: token
                        });
                        //req.userData = userData
                    });
                } else {
                    res.status(401).json({
                        message: "Invalid credentials!",
                    });
                }
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
        });
    });
});



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
