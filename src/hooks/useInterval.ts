import { useEffect, useRef } from 'react'

export const useInterval = (
  callback: () => void,
  delay: number,
  isPaused = false
) => {
  // Use refs instead of useCallback/useState so interval won`t stop
  // if some of the deps updates (better UX)
  const delayRef = useRef(delay)
  const idRef = useRef<number>()
  const cbRef = useRef(callback)
  cbRef.current = callback
  delayRef.current = delay

  useEffect(() => {
    if (isPaused) return
    // Can's use plain setTimeout,
    // because it's return type is NodeJS.Timeout, not number
    idRef.current = window.setTimeout(function f() {
      clearTimeout(idRef.current)
      cbRef.current()
      idRef.current = window.setTimeout(f, delayRef.current)
    }, 0)

    return () => clearTimeout(idRef.current)
  }, [ isPaused ])

  return () => clearTimeout(idRef.current)
}
