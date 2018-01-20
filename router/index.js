import * as user from '../controllers/user'
import Router from 'koa-router'

const router = new Router({
  prefix: '/api'
})
/* route */
router.get('/test', function (ctx, next) {
  ctx.status = 200
  ctx.body = 'this a test response!'
})
// login
router.post('/login', async function (ctx, next) {
  await user.login(ctx, next)
})
// register
router.post('/register', user.createUser)
// 查询用户
router.get('/user/:name', user.findUserByName)
router.get('/test/:name', user.findUserByName)
// 登出
router.post('/signOut', user.signOut)

module.exports = router
export default router
