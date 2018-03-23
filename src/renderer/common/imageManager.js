import axios from 'axios'
import fs from 'fs'
import path from 'path'
import {
  promisify
} from 'util'
import {
  IMAGE_SAVE_DIR
} from '@/constants'
import copyGif from '@/common/copyGif'
import isGif from 'is-gif'
import {
  clipboard,
  nativeImage
} from 'electron'

class ImageManger {
  constructor (url) {
    this.url = url
    this.imageData = axios.get(url, { responseType: 'blob' })
  }

  async copy () {
    let filename = this.url.split('/').pop()
    // 如果没有后缀，给一个默认的 .jpg
    if (!filename.includes('.')) {
      filename += '.jpg'
    }

    try {
      const { data } = await this.imageData
      const reader = new FileReader()
      reader.readAsArrayBuffer(data)
      // 先将文件下载到本地
      const buffer = await new Promise(resolve => {
        reader.onloadend = () => {
          const buffer = Buffer.from(reader.result)
          const filePath = path.resolve(IMAGE_SAVE_DIR, filename)
          promisify(fs.writeFile)(filePath, buffer)
          resolve(buffer)
        }
      })
      // 拷贝到剪切板
      if (isGif(buffer)) {
        copyGif(filename)
      } else {
        clipboard.writeImage(nativeImage.createFromBuffer(buffer))
      }
    } catch (e) {
      console.error(e)
      // todo: error handler
    }
  }

  async toBase64 () {
    try {
      const { data } = await this.imageData
      const reader = new FileReader()
      reader.readAsDataURL(data)
      return new Promise(resolve => {
        reader.onloadend = () => resolve(reader.result)
      })
    } catch (e) {
      console.error(e)
      // todo: error handler
    }
  }
}

export default ImageManger
