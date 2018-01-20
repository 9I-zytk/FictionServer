/**
 * Created by 9i
 * @Date 2017/12/21
 */
'use strict'
import User from '../model/user.model'
import bcrypt from 'bcrypt'
import {signToken} from '../middlreware/auth'
import * as userOpt from './userOpt'
const config = require('../configs/default')

/**
 * 登录
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
export async function login (ctx, next) {
  const login = ctx.request.body
  const user = await findUser(login.name)
  if (user) {
    // 验证密码
    if (bcrypt.compareSync(login.passWord, user.passWord)) {
      // 校验通过
      const token = signToken(user, config.jwt.cert)
      ctx.status = 200
      ctx.body = {
        code: 1,
        data: user,
        token: token
      }
      // 记录登录
      await userOpt.create(user.name, '登录')
    } else {
      ctx.status = 200
      ctx.body = {
        code: -1,
        message: '用户名或密码错误'
      }
    }
  } else {
    ctx.status = 200
    ctx.body = {
      code: -1,
      message: '用户名不存在'
    }
  }
}
/**
 * 登出
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
export async function signOut (ctx, next) {
  try {
    const signOut = ctx.request.body
    await userOpt.create(signOut.name, '登出')
    ctx.status = 200
    ctx.body = {
      code: 1,
      message: '用户登出成功'
    }
  } catch (err) {
    console.log(err)
  }
}

export async function findUserByName (ctx, next) {
  const name = ctx.params.name
  const user = await findUser(name)
  if (user) {
    ctx.status = 200
    ctx.body = {
      code: 1,
      message: '查询成功',
      data: user
    }
  } else {
    ctx.status = 200
    ctx.body = {
      code: -1,
      message: '用户名不存在'
    }
  }
}

export async function createUser (ctx, next) {
  try {
    const user = ctx.request.body
    // 密码加密
    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(user.passWord, salt)
    user.passWord = hash
    const response = await create(user)
    if (!response.created) {
      ctx.status = 200
      ctx.body = {
        code: -1,
        message: '用户名已经存在'
      }
    } else {
      ctx.status = 200
      const token = signToken(response.user, config.jwt.cert)
      ctx.body = {
        code: 1,
        message: '用户新增成功',
        user: response.user,
        token: token
      }
    }
  } catch (err) {
    ctx.status = 200
    ctx.body = {
      code: -1,
      message: '新增用户失败'
    }
  }
}

export async function UpdateUser (ctx, next) {

}
export async function modifyPassWord (ctx, next) {
  const login = ctx.request.body
  const user = await findUser(login.name)
  if (user) {
    // 验证密码
    if (bcrypt.compareSync(login.passWord, user.passWord)) {
      // 校验通过
      await _modifyPassWord(login.name, login.currentPassWord)
      // 记录登录
      await userOpt.create(user.name, '修改密码')
    } else {
      ctx.status = 200
      ctx.body = {
        code: -1,
        message: '原密码错误'
      }
    }
  } else {
    ctx.status = 200
    ctx.body = {
      code: -1,
      message: '用户名不存在'
    }
  }
}

async function create (user) {
  return new Promise((resolve, reject) => {
    User.findOrCreate({where: {name: user.name}, defaults: user})
      .spread((user, created) => {
        resolve({
          user: user,
          created: created
        })
      })
  })
}

async function findUser (name) {
  const userInfo = await User.findOne({where: {name}})
  return userInfo
}

async function _modifyPassWord (name, passWord) {
  const salt = bcrypt.genSaltSync()
  const _passWord = bcrypt.hashSync(passWord, salt)
  return new Promise((resolve, reject) => {
    User.update({passWord: _passWord}, {
      where: {name: name}
    })
  })
}
