import { post } from '../axios/index.js'

export function goPay(params) {
  return post('api/v1/pay', params)
}
