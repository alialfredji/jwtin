# JWTIn

Super simple service-to-service authentication mechanism with distributed secrets as environment variables.

## Define Services Secrets

You need to provide an environment variable `JWTIN` with a JSON encoded map of `service:secret`:

```bash
JWTIN="{\"s1\":\"aaa\", \"s2\":\"bbb\"}"
```

## Create a Token

```js
const { createToken } = require('../index')
const token = await createToken('s1', 's2', { foo: 123 })
```

The token's secret will be `secret(s1) + secret(s2)`

## Validate a Token

```js
const { validateToken } = require('../index')
const token = await validateToken('xxx')
// console.log(token.from)
// console.log(token.to)
// console.log(token.payload)
```

