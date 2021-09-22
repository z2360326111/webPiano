import { post } from '../axios/index.js'
// 支付宝-生成订单
export function goPay(params) {
  return post('api/v1/pay', params)
}
// 支付宝-关闭交易
export function closePay(params) {
  return post('api/v1/aliPayClose', params)
}
// 支付宝-交易退款
export function aliPayRefund(params) {
  return post('/api/v1/aliPayRefund', params)
}
// 支付宝-交易退款查询
export function refundQuery(params) {
  return post('/api/v1/aliPay/refundQuery', params)
}
// 支付宝-交易撤销
export function aliPayCancel(params) {
  return post('/api/v1/aliPayCancel', params)
}
// 支付宝-交易查询
export function aliPayQuery(params) {
  return post('/api/v1/aliPayQuery', params)
}
