
const getKeys = (from, to, keyName = 'JWTIN') => {
    const keysStr = process.env[keyName]
    if (!keysStr) {
        throw new Error(`missing environment keys - ${keyName}`)
    }

    let keys = null
    try {
        keys = JSON.parse(keysStr)
    } catch (err) {
        throw new Error(`wrong JSON format in environment keys`)
    }

    if (!keys[from]) {
        throw new Error(`missing key "from:${from}"`)
    }

    if (!keys[to]) {
        throw new Error(`missing key "to:${to}"`)
    }

    return `${keys[from]}${keys[to]}`
}

module.exports = getKeys
