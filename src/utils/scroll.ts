let timer: any = null // 定时器

let TargetLocation = -1 // 上一次点击应该滚动到的目标位置

let toltalSpace = 0 // 本次要滚动的距离



/**

 * @info 竖直滚动

 * @info 滚动动画 hz 刷新率 可以修改滚动的速度

 * @params dom：要滚动的元素； space 要滚动的距离； istop 滚动的方向;

*/

const movingColumn = (dom: HTMLElement, space: number, istop: boolean) => {



  // 用户快速点击 则把上次未滚动的距离与本次滚动结合再一起

  if (timer && TargetLocation !== -1) {

    toltalSpace += TargetLocation - dom.scrollTop

    // 计算本次的目标距离

    if (istop) {

      TargetLocation = dom.scrollTop + toltalSpace + space

    } else {

      TargetLocation = dom.scrollTop + toltalSpace - space

    }

  } else if (!timer) {

    toltalSpace = 0

    TargetLocation = -1

  }



  if (istop) {

    toltalSpace -= space

  } else {

    toltalSpace += space

  }



  // 获取本次的目标位置

  const position = dom.scrollTop

  TargetLocation = position + toltalSpace



  clearInterval(timer)

  timer = null

  const hz = 60

  let i = 1

  timer = setInterval(() => {

    dom.scrollTop = position + i * toltalSpace / hz

    ++i

    if (i >= hz) {

      clearInterval(timer)

      timer = null

      dom.scrollTop = TargetLocation // 位置修正

      toltalSpace = 0

      TargetLocation = -1

    }

  }, 1)

}





/**

 * @info 水平滚动

 * @info 滚动动画 hz 刷新率 可以修改滚动的速度

 * @params dom：要滚动的元素； space 要滚动的距离； isLeft 滚动的方向;

*/

const moving = (dom: HTMLElement, space: number, isLeft: boolean) => {



  // 用户快速点击 则把上次未滚动的距离与本次滚动结合再一起

  if (timer && TargetLocation !== -1) {

    toltalSpace += TargetLocation - dom.scrollLeft

    // 计算本次的目标距离

    if (isLeft) {

      TargetLocation = dom.scrollLeft + toltalSpace + space

    } else {

      TargetLocation = dom.scrollLeft + toltalSpace - space

    }

  } else if (!timer) {

    toltalSpace = 0

    TargetLocation = -1

  }



  if (isLeft) {

    toltalSpace -= space

  } else {

    toltalSpace += space

  }



  // 获取本次的目标位置

  const position = dom.scrollLeft

  TargetLocation = position + toltalSpace



  clearInterval(timer)

  timer = null

  const hz = 60

  let i = 1

  timer = setInterval(() => {

    dom.scrollLeft = position + i * toltalSpace / hz

    ++i

    if (i >= hz) {

      clearInterval(timer)

      timer = null

      dom.scrollLeft = TargetLocation // 位置修正

      toltalSpace = 0

      TargetLocation = -1

    }

  }, 1)

}



export {

  moving,

  movingColumn

}