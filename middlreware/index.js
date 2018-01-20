/**
 * Created by 9i
 * @Date 2017/12/21
 */

'use strict'
import {getToken} from './auth'
import jwt from 'jsonwebtoken'
import util from 'util'

export default function authorization (secret) {
  return async function (ctx, next) {
    try {
      const token = getToken(ctx)
      const verify = util.promisify(jwt.verify)
      if (token) {
        let payload
        try {
          payload = await verify(token, secret)
          ctx.user = {
            name: payload.name,
            id: payload.id
          }
        } catch (err) {
          console.log('验证token失败! ', err)
        }
      }
      await next()
    } catch (err) {
      if (err.status === 401) {
        ctx.body = {
          code: -1,
          message: 'token认证失败'
        }
      } else {
        err.status = 404
        ctx.body = '404'
        console.log('404：', err)
      }
    }
  }
}
