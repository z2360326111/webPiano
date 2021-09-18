import { post } from '../axios/index.js'
// 生成订单
export function goPay(params) {
  return post('api/v1/pay', params)
}

export function closePay(params) {
  return post('api/v1/aliPayClose', params)
}
