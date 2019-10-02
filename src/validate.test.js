const jwt = require('jsonwebtoken')
const { createToken } = require('../index')
const { validateToken } = require('../index')

describe('jwtin create tokent', () => {
    const realEnv = JSON.stringify(process.env)

    it('should fail if misspelled token is given', async () => {
        await expect(validateToken('xxx'))
        .rejects
        .toThrow(`wrong JWT`)
    })

    it('should fail if no environment variables are used', async () => {
        await expect(validateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcm9tIjoiczEiLCJ0byI6InMyIiwicGF5bG9hZCI6eyJ1aWQiOjIyfSwiaWF0IjoxNTcwMDE2NjEwfQ.NIPnJ7KdfuOClQXxrbmp6d1Ohrr18ykA-WgT05gEOok'))
        .rejects
        .toThrow(`missing environment keys - JWTIN`)
    })
})
