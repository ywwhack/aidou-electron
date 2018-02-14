const HIDDEN_INPUT = document.createElement('textarea')
HIDDEN_INPUT.style.position = 'fixed'
HIDDEN_INPUT.style.left = '-1000px'
document.body.appendChild(HIDDEN_INPUT)

export default function copy (v, cb) {
  if (!HIDDEN_INPUT || !HIDDEN_INPUT.select) return
  HIDDEN_INPUT.value = v
  HIDDEN_INPUT.focus()
  HIDDEN_INPUT.select()
  let suc = false
  try {
    document.execCommand('copy')
    suc = true
  } catch (e) {
    console.log(e)
  }
  cb && cb(suc)
  HIDDEN_INPUT.blur()
  HIDDEN_INPUT.value = ''
}
