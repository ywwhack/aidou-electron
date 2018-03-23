import $ from 'nodobjc'
import path from 'path'
import {
  IMAGE_SAVE_DIR
} from '@/constants'

$.framework('Foundation')
$.framework('AppKit')

export default function copyGif (filename) {
  const pool = $.NSAutoreleasePool('alloc')('init')

  const $pasteboard = $.NSPasteboard('generalPasteboard')
  $pasteboard('clearContents')
  const $url = $.NSURL('alloc')('initFileURLWithPath', $.NSString('stringWithUTF8String', path.resolve(IMAGE_SAVE_DIR, filename)))
  const $filesToCopy = $.NSMutableArray('alloc')('init')
  $filesToCopy('addObject', $url)
  $pasteboard('writeObjects', $filesToCopy)

  pool('drain')
}
