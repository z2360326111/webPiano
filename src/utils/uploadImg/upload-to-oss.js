'use strict'

const OSS = require('ali-oss')
import { message } from 'ant-design-vue'
// import { uploadToMatials } from 'api/material'
// import store from '@/store'
/*
 ** 上传OSS组件
 ** options：region 、 accessKeyId 、 accessKeySecret（oss账号信息）
 ** options: dirName（上传的文件夹地址）
 ** options: type（上传的文件类型）
 */

class UploadFile {
  constructor(options) {
    // const { dirName = 'common', type = 'png' } = options
    this.region = options.region || process.env.VUE_APP_OSS_REGION
    this.accessKeyId =
      options.accessKeyId || process.env.VUE_APP_OSS_ACCESSKEYID
    this.accessKeySecret =
      options.accessKeySecret || process.env.VUE_APP_OSS_ACCESSKEYSECRET
    this.bucket = options.bucket || process.env.VUE_APP_OSS_BUCKET
    this.fileName =
      'imgs' + new Date().getTime() + Math.floor(Math.random() * 90000) // 生成文件名标识符

    options.file && (this.file = options.file)
    // 上传的oss文件夹名称
    this.dirName = 'other-upload'
    options.dirName && (this.dirName = options.dirName)

    // if (options.hasOwnProperty('dirName')) {
    //   this.dirName = options.dirName
    // } else {
    //   this.dirName = 'new-editor-upload'
    // }

    options.type ? (this.type = options.type) : (this.type = 'png') // 上传的oss文件格式

    this.ossClient = new OSS({
      region: 'oss-cn-shenzhen', // this.region,
      accessKeyId: 'LTAI5tAZkbVRyWEmXMrEZf1p', // this.accessKeyId,
      accessKeySecret: 'DGK0Efgn9wGi54aTABBtv3JiXkW2zX', // this.accessKeySecret,
      bucket: 'web-fs-piano' // this.bucket
    })
    this.imgData = {}
  }
  /* PNG / JPEG 文件流形式上传 */
  async upload_by_stream(stream) {
    const result = await this.ossClient.putStream(
      `/${this.dirName}/${this.fileName}}.${this.type}`,
      stream
    )
    this.imgInfo = result
    const res = await this.upload_to_maiterials()
    return res
  }
  /* base64 文件流 形式上传*/
  async upload_by_base64(base64) {
    const filename = `${this.fileName}}.${this.type}`
    const imageFile = await this.dataURLtoFile(base64, filename)
    const result = await this.upload_by_file(imageFile)
    return result.res
  }
  /* 文件形式 上传 */
  async upload_by_file(file) {
    const result = await this.ossClient.put(
      `/${this.dirName}/${this.fileName}.${this.type}`,
      file
    )
    return result
  }
  /* base64 转成 file文件 */
  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(',')
    var mime = arr[0].match(/:(.*?);/)[1]
    var bstr = atob(arr[1])
    var n = bstr.length
    var u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    // 转换成file对象
    return new File([u8arr], filename, { type: mime })
  }
  // 验证图片格式
  veritifyUploadFile() {
    const isFormat =
      this.file.type === 'image/jpeg' ||
      this.file.type === 'image/png' ||
      this.file.type === 'image/svg+xml'
    const isLt3M = this.file.size / 1024 / 1024 < 3
    if (!isFormat) {
      message.error('上传的素材只能是 JPG 、 PNG 格式或者 SVG!')
    }
    if (!isLt3M) {
      message.error('上传的素材大小不能超过 3MB!')
    }
    return isFormat && isLt3M
  }
  // 读文件
  async fileToDataURL(file, fn) {
    // 读取文件为base64编码
    const reader = new FileReader()
    reader.onloadend = function(e) {
      fn(e.target.result)
    }
    reader.readAsDataURL(file)
  }
  // 文件转换
  initMatrial() {
    // 更新上传素材列表
    const me = this
    return new Promise(resolve => {
      const img = new Image()
      // const img_url = window.URL.createObjectURL(file)
      me.fileToDataURL(this.file, res => {
        const img_url = res
        const initMatrial = {
          id: 0,
          path: img_url,
          fileName: '',
          loadProgress: 0,
          publish: false,
          width: 0,
          height: 0,
          file_size: 0,
          fileFormat: ''
        }
        img.src = img_url
        img.onload = () => {
          const ww = img.width
          const hh = img.height
          initMatrial.width = ww
          initMatrial.height = hh
          initMatrial.file_size = me.file.size
          initMatrial.fileFormat = me.file.type
          me.newFile = {
            ...initMatrial
          }
          // 处理上传oss
          me.uploadToOss(me.file)
            .then(res => {
              const r = {
                fileName: res.fileName,
                filePath: res.requestUrl,
                width: ww,
                height: hh,
                size: me.file.size,
                format: me.file.type
              }
              return resolve(r) // 通过oss路径获取role
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    })
  }
  uploadToOss(file) {
    // 上传图片到oss，获取地址以及文件名
    const me = this
    return new Promise((resolve, reject) => {
      // const time = Date.now()
      // const onlyId = uuid()
      const nameType = file.name.split('.')
      const imgtype = nameType[nameType.length - 1]
      const onlyId = Math.floor(Math.random() * 999999999)
      const time = new Date().getTime()
      console.log(me.ossClient)
      me.ossClient
        .put(`/client_user_upload/_${onlyId}${time}.${imgtype}`, file)
        .then(res => {
          // console.log(res)
          const requestUrl = me.callbackPath(res.res.requestUrls[0])
          const fileName = res.name.substr(res.name.lastIndexOf('/') + 1)
          resolve({
            requestUrl,
            fileName
          })
        })
        .catch(err => {
          message.warning('抱歉，阿里云OSS上传失败请重试！')
          console.log(err)
          reject(err)
        })
    })
  }
  callbackPath(url) {
    // 处理图片地址
    if (url.indexOf('uploadId') !== -1) {
      return url.match(/(\S*)\?uploadId/)[1]
    } else {
      return url
    }
  }
  // png上传
  async upload_png_image() {
    if (this.veritifyUploadFile()) {
      const res = await this.initMatrial()
      this.imgInfo = res
      const imgInfo = await this.upload_to_maiterials()
      return imgInfo
    }
  }
  // 上传图片到服务器（素材系统）
  async upload_to_maiterials() {
    const data = {
      path: this.imgInfo.filePath,
      size_width: this.imgInfo.width,
      size_height: this.imgInfo.height,
      file_size: this.imgInfo.size
    }
    return data
    // const res = await uploadToMatials({
    //   data: JSON.stringify(data)
    // })
    // if (res.code === 200) {
    //   this.imgData = res.data
    //   return this.imgData
    // } else {
    //   message.warning('上传服务器失败!')
    //   return {}
    // }
  }
}

// module.exports = UploadFile
export default UploadFile
