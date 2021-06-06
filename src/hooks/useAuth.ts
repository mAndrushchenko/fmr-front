import { useCallback, useEffect, useState } from 'react'
import { userSelector, delUserData, setUserDataAction } from 'src/store/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { TAppDispatch } from 'src/types/store'

const tokenName = 'token'
const setTokenToCookie = (jwtToken = '') => {
  document.cookie = `${tokenName}=${jwtToken}`
}

export const useAuth = () => {
  const { token } = useSelector(userSelector)
  const dispatch = useDispatch<TAppDispatch>()

  const [ savedToken, setSavedToken ] = useState('')

  const login = useCallback((jwtToken: string) => {
    if (jwtToken) {
      setTokenToCookie(jwtToken)
      setSavedToken(jwtToken)
    }
  }, [ dispatch, token ])

  const getToken = useCallback(() => {
    let currentToken: string = ''
    document.cookie.split('; ').forEach((field: string) => {
      const currentField = field.split('=')
      const [ cookieKey, cookieValue ] = currentField
      if (cookieKey === 'token') currentToken = cookieValue
    })
    return currentToken
  }, [])

  const logout = useCallback(() => {
    setTokenToCookie()
    setSavedToken('')
    dispatch(delUserData())
  }, [ dispatch ])

  const isTokenExist = useCallback(() => {
    const newToken = getToken()
    setSavedToken(newToken)
  }, [ savedToken ])

  useEffect(() => {
    isTokenExist()
    if (!!token && token !== savedToken) {
      login(token)
    }
    if (savedToken && !token) {
      dispatch(setUserDataAction({ token: savedToken }))
    }
  }, [ login, token, savedToken ])

  return { login, logout, isTokenExist, savedToken }
}
