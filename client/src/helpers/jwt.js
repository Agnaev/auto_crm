import jwt from 'jsonwebtoken'

export function jwtSign (payload, config = {}) {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
      ...config
    }
  )
}

export function jwtRefreshSign (payload, config = {}) {
  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_TOKEN_LIFETIME,
    {
      expiresIn: process.env.JWT_REFRESH_TOKEN_LIFETIME,
      ...config
    }
  )
}

export function jwtVerify (token) {
  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET,
      {
        algorithm: 'HS256'
      })
  } catch (e) {
    return e.message
  }
}
