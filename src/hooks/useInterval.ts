import { MutableRefObject, useCallback, useEffect, useRef } from 'react'

export const useInterval = (
  callback: () => boolean | void,
  delayRef: MutableRefObject<number>,
  deps: unknown[]
) => {
  const idRef = useRef<number>()
  const cb = useCallback(callback, deps)

  useEffect(() => {
    // Can's use plain setTimeout,
    // because it's return type is NodeJS.Timeout, not number
    idRef.current = window.setTimeout(function f() {
      clearTimeout(idRef.current)
      if (cb()) return
      idRef.current = window.setTimeout(f, delayRef.current)
    }, delayRef.current)

    return () => clearTimeout(idRef.current)
  }, [ idRef, delayRef, cb ])

  return () => clearTimeout(idRef.current)
}
