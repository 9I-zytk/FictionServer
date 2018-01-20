/**
 * Created by 9i
 * @Date 2017/12/20
 */
'use strict'
import jwt from 'jsonwebtoken'

export function getToken (ctx) {
  const header = ctx.request.header.authorization
  if (!header) {
    return null
  }
  const parts = header.split(' ')
  if (parts.length !== 2) {
    return null
  }
  const scheme = parts[0]
  const token = parts[1]
  if (/^Bearer$/i.test(scheme)) {
    return token
  }
  return null
}

export function signToken (user, secret) {
  const userToken = {
    name: user.name,
    id: user.id
  }
  return jwt.sign(userToken, secret, {expiresIn: '1h'})
}
