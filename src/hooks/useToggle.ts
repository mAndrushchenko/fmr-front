import { useCallback, useState } from 'react'

type Toggle = (state?: boolean) => void

export const useToggle = (initialState = false): [ boolean, Toggle ] => {
  const [ state, setState ] = useState(initialState)
  const toggle = useCallback(
    (newState?: boolean) => setState(v => newState ?? !v),
    []
  )
  return [ state, toggle ]
}
