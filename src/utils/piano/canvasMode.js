// const canvas = document.getElementById('screen-keys')
// const ctx = canvas.getContext('2d')

export function drawRect(ctx, pos) {
  // ctx.save()
  // console.log('画方框')
  // ctx.clearRect(0, 0, 10000, 10000)
  ctx.fillStyle = '#41B883'
  // ctx.fillRect(10, 10, 10, 10)
  ctx.fillRect(pos.x, pos.y, pos.w, pos.h)
}
