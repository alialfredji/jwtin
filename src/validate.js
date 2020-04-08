const jwt = require('jsonwebtoken')
const getKeys = require('./get-keys')

const validateToken = (token) => {
    const data = jwt.decode(token)
    if (!data) throw new Error(`wrong JWT`)

    const key = getKeys(data.from, data.to)
    return jwt.verify(token, key)
}

module.exports = validateToken

