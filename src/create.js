const jwt = require('jsonwebtoken')
const getKeys = require('./get-keys')

const createToken = async (from, to, payload, options = {}) => {
    const key = getKeys(from, to)
    const opt = {
        ...options,
        expiresIn: options.expiresIn || '30s',
    }

    return jwt.sign({ from, to, payload }, key, opt)
}

module.exports = createToken
