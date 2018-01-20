import {isNum} from './tool'
const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
const chnUnitChar = ['', '十', '百', '千']
/* */

export function NumberToChinese (num) {
  let chr = ''
  let unitIndex = 0
  let zero = true
  if (!isNum(num)) return chnNumChar[0]
  while (num > 0) {
    const v = num % 10
    if (v === 0) {
      if (!zero) {
        zero = true
        chr = chnNumChar[v] + chr
      }
    } else {
      zero = false
      let str = chnNumChar[v]
      str = str + chnUnitChar[unitIndex]
      chr = str + chr
    }
    unitIndex++
    num = Math.floor(num / 10)
  }
  return chr
}

const chnNameValue = new Map([['零', 0], ['一', 1], ['二', 2], ['三', 3], ['四', 4], ['五', 5],
  ['六', 6], ['七', 7], ['八', 8], ['九', 9]])
const chnUnit = new Map([['十', 10], ['百', 100], ['千', 1000], ['万', 10000]])

export function ChineseToNumber (str) {
  let num = 0
  let number = 0
  const strArr = str.split('')
  for (let i = 0; i < strArr.length; i++) {
    let strTemp = strArr[i]
    // 字符是否为数字
    if (chnNameValue.has(strTemp)) {
      number = chnNameValue.get(strTemp)
      if (i === strArr.length - 1) num += number
    } else if (chnUnit.has(strTemp)) { // 是否为单位
      let unit = chnUnit.get(strTemp)
      num += number * unit
      number = 0
    } else {
      // 非数字不处理
      if (number) num += number
    }
  }
  return num
}
