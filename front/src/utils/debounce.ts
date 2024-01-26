let throttleLastTime = Date.now()

export const throttle = (delay: number, func: (...args: any[]) => any) => {
  return (...args: any[]) => {
    const currentTime = Date.now()
    if (currentTime - throttleLastTime < delay) {
      throttleLastTime = currentTime
      console.log('cancelled by throttle')
      return
    }
    throttleLastTime = currentTime
    console.log('play throttle')
    func(...args)
  }
}

export const debounce = (delay: number, func: () => any) => {
  let timer: ReturnType<typeof setTimeout> | undefined = undefined
  return () => {
    if (timer) {
      console.log('debounce redelay')
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      console.log('play debounced function')
      func()
      timer = undefined
    }, delay)
  }
}
