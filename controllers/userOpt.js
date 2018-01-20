/**
 * Created by 9i
 * @Date 2017/12/21
 */
'use strict'
import UserOpt from '../model/userOpt'
/**
 * 用户操作日志
 * @param 登录用户名
 * @param 操作方式 登录 登出
 * @returns {true}
 */
export async function create (name, optType) {
  UserOpt.create({
    name: name,
    optType: optType
  })
  return true
}
/**
 * 检查用户是否在线 判断是否登录
 * @param 登录用户名
 * @returns {Boolean}
 */
export async function findByUser (name) {
  let online = false
  const optInfo = await UserOpt.findOne({where: {name}, order: 'optTime DESC'})
  if (optInfo && optInfo.optType !== '登出') online = true

  return online
}
