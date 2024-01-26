let throttleLastTime = Date.now()

export const throttle = (func: () => any) => {
  return () => {
    const currentTime = Date.now()
    if (currentTime - throttleLastTime < 500) {
      throttleLastTime = currentTime
      console.log('cancelled by throttle')
      return
    }
    throttleLastTime = currentTime
    console.log('play throttle')
    func()
  }
}

export const debounce = (delay: number, func: () => any) => {
  let timer: ReturnType<typeof setTimeout> | undefined = undefined
  return () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      console.log('play debounced function')
      func()
      timer = undefined
    }, delay)
  }
}
