const jwt = require('jsonwebtoken');
const KEY_JWT = 'LLAVE_JWT_ACCESS';

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, KEY_JWT);
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
}
module.exports = auth