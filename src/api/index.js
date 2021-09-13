import { get } from '@/axios'

/**
 * @brief: 获取素材列表接口
 * @param 无
 * @return {*}
 * @note: 注意点
 */

export function getMaterialList() {
  return get('/api/v1/client/material/recommend')
}

/**
 * @brief: 简要描述函数作用
 * @param {*}
 * @return {*}
 * @note: 注意点
 */
export function getDetail() {
  return get('api/v1/client/material/detail')
}
