const jwt = require('jsonwebtoken')
const { createToken } = require('../index')
const { validateToken } = require('../index')

describe('jwtin create token', () => {
    const realEnv = JSON.stringify(process.env)

    it('should fail if no environment variables are used', async () => {
        await expect(createToken('not', 'not', {}))
        .rejects
        .toThrow(`missing environment keys - JWTIN`)
    })

    describe('with wrong environment variables', () => {
        beforeEach(() => {
            jest.resetModules()
            process.env.JWTIN = 'foo'
        })

        afterEach(() => {
            process.env = JSON.parse(realEnv)
        })

        it('should fail if the keys are not in JSON format', async () => {
            await expect(createToken('not', 'not', {}))
            .rejects
            .toThrow(`wrong JSON format in environment keys`)
        })
    })

    describe('with correct environment variables', () => {
        beforeEach(() => {
            jest.resetModules()
            process.env.JWTIN = JSON.stringify({
                s1: 'aaa',
                s2: 'bbb',
            })
        })

        afterEach(() => {
            process.env = JSON.parse(realEnv)
        })

        it('should fail if mismatch "from"', async () => {
            await expect(createToken('not', 'not', {}))
            .rejects
            .toThrow(`missing key "from:not"`)
        })

        it('should fail if mismatch "to"', async () => {
            await expect(createToken('s1', 'not', {}))
            .rejects
            .toThrow(`missing key "to:not"`)
        })

        it('should generate a token', async () => {
            const t = await createToken('s1', 's2', { uid: 22 })
            const d = await validateToken(t)
            expect(d.payload).toEqual({ uid: 22 })
            expect(d.from).toBe('s1')
            expect(d.to).toBe('s2')
        })
    })
})
