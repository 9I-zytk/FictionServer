import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'kcors'
import Router from 'koa-router'
import logUtil from './utils/index.js'
import jwt from 'koa-jwt'
import logger from 'koa-logger'
import auth from './middlreware/index'
/* eslint-disable no-unused-vars */
import db from './sql'
import model from './model/index'

const config = require('./configs/default')

const app = new Koa()

/**
 * 将config注入中间件的ctx
 * */
app.context.config = config
// 关键字
// middleware
app.use(cors())
  .use(auth(config.jwt.cert))
  .use(bodyParser())
  .use(jwt({secret: config.jwt.cert}).unless({path: [/^\/api\/login/, /^\/api\/register/, /^\/api\/test/]}))
  .use(logger())
// routes
const api = require('./router/index')
app.use(api.routes())
  .use(api.allowedMethods())
// logger
app.use(async (ctx, next) => {
  // 响应开始时间
  const start = new Date()
  console.log(start)
  // 响应间隔时间
  let ms
  try {
    // 开始进入到下一个中间件
    await next()

    ms = new Date() - start
    // 记录响应日志
    logUtil.logResponse(ctx, ms)
  } catch (error) {
    ms = new Date() - start
    // 记录异常日志
    logUtil.logError(ctx, error, ms)
  }
})
require('./schedule/index')
// const server = require('http').createServer(app.callback())
// error
app.on('error', (err, ctx) => {
  if ((ctx.status === 404 && err.status === undefined) || err.status === 500 ) {
    logUtil.logError(ctx, err)
  }
  console.log('error==>', err)
  logUtil.logError(ctx, err)
})
app.listen(config.app.port, () => {
  console.log('app is listening on port ' + config.app.port)
})
