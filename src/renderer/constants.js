const path = require('path')

// 表情存放的本地目录
export const IMAGE_SAVE_DIR = path.resolve(__static, 'temp_image')

// 表情类型 - 表情 | 表情包
export const EXPRESSION_TYPE_MAP = {
  expression: '表情',
  package: '表情包'
}
