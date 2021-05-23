import { useCallback, useEffect, useState } from 'react'
import { userSelector, delUserData } from 'src/store/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { TAppDispatch } from 'src/types/store'

const tokenName = 'token'

export const setTokenToCookie = (jwtToken = '') => {
  document.cookie = `${tokenName}=${jwtToken}`
}

// const userName = 'user'

export const useAuth = () => {
  const { token } = useSelector(userSelector)
  const dispatch = useDispatch<TAppDispatch>()

  const [ savedToken, setSavedToken ] = useState<null | string>(null)

  const login = useCallback((jwtToken: string | null) => {
    if (jwtToken) {
      setTokenToCookie(jwtToken)
      // document.cookie = `${tokenName}=${jwtToken}`
      setSavedToken(jwtToken)
    }
  }, [ dispatch, token ])

  const logout = useCallback(() => {
    setTokenToCookie()
    // document.cookie = `${tokenName}=`
    dispatch(delUserData())
    setSavedToken(null)
  }, [ dispatch ])

  const getItem = useCallback((key: string): string | null => {
    let currentToken: string | null = null
    document.cookie.split('; ').forEach((field: string) => {
      const currentField = field.split('=')
      const [ cookieKey, cookieValue ] = currentField
      if (key === cookieKey) currentToken = cookieValue
    })
    return currentToken
  }, [])

  useEffect(() => {
    if (token) {
      login(token)
    }
  }, [ login, token ])

  const isTokenExist = useCallback(() => {
    setSavedToken(getItem(tokenName))
  }, [ getItem ])

  return { login, logout, isTokenExist, savedToken }
}
