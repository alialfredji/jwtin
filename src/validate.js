const jwt = require('jsonwebtoken')
const getKeys = require('./get-keys')

const validateToken = async (token) => {
    const data = jwt.decode(token)
    if (!data) {
        throw new Error(`wrong JWT`)
    }

    const key = getKeys(data.from, data.to)
    return (await jwt.verify(token, key))
}

module.exports = validateToken

