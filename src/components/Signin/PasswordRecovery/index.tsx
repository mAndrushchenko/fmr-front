import React, { VFC, useState, useCallback } from 'react'
import { Redirect } from 'react-router-dom'
import { sign } from 'jsonwebtoken'

import {
  Button,
  Checkbox,
  TextField,
  Typography,
  FormControlLabel
} from '@material-ui/core'

import { useDispatch, useSelector } from 'react-redux'
import { emailRegexp, passwordRegexp } from 'src/shared/constant/regExp'
import { passwordError, emailError } from 'src/shared/constant/errorMasseges'
import { passwordRecoveryAction, userSelector } from 'src/store/slices/userSlice'
import { TAppDispatch } from 'src/types/store'

import { AfterRecoveryComponent } from './AfterRecoveryComponent'
import { styles } from './styles'
import { spinnerSelector, startSpin } from '../../../store/slices/spinnerSlice'

export const PasswordRecovery: VFC = () => {
  const classes = styles()
  const [ recoverReq, setRecoverReq ] = useState(false)
  const { spin, error: err } = useSelector(spinnerSelector)
  const dispatch = useDispatch<TAppDispatch>()
  const { token } = useSelector(userSelector)
  const [ form, setForm ] = useState({
    email: '',
    firstPassword: '',
    secondPassword: ''
  })

  const [ ignoreEmail, setIgnore ] = useState(false)

  const [ error, setError ] = useState({
    email: '',
    firstPassword: ''
  })

  const validation = useCallback(() => {
    let passwordProblem: string
    if (form.firstPassword !== form.secondPassword) {
      passwordProblem = 'You password does not match'
    } else if (!passwordRegexp.test(form.firstPassword)) {
      passwordProblem = passwordError
    } else {
      passwordProblem = ''
    }

    return {
      email: (ignoreEmail || emailRegexp.test(form.email)) ? '' : emailError,
      firstPassword: passwordProblem
    }
  }, [ form ])
  const onBlurHandler = useCallback(() => {
    setError(validation())
  }, [ form ])

  const fieldChangeHandler = useCallback(e => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
  }, [ form ])

  const checkboxHandler = useCallback(e => {
    setIgnore(e.target.checked)
    setError({
      ...error,
      email: (e.target.checked ||
        emailRegexp.test(form.email)) ? '' : emailError
    })
  }, [ form, error ])

  const submitHandler = useCallback(e => {
    e.preventDefault()

    const newError = validation()

    if (!newError.email && !newError.firstPassword) {
      const newToken = sign({
        email: form.email,
        password: form.firstPassword
      }, 'ssh')
      dispatch(startSpin())
      dispatch(passwordRecoveryAction({ token: newToken }))
      setRecoverReq(true)
    }
    setError(newError)
  }, [ dispatch, form ])

  return (
    <div className={classes.root}>
      {(recoverReq && !spin && !err)
        ? <AfterRecoveryComponent />
        : <div className={classes.passwordRecovery}>
            <Typography variant='h4'>
              Password recovery
            </Typography>

            <p>
              Write your email here
            </p>

            <form onSubmit={submitHandler}>
              <TextField
                label='Email'
                id='email'
                type='email'
                variant='outlined'
                margin='normal'
                required
                fullWidth
                value={form.email}
                error={!!error.email}
                helperText={error.email}
                onChange={fieldChangeHandler}
                onBlur={onBlurHandler}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    checked={ignoreEmail}
                    onChange={checkboxHandler}
                  />
                }
                label='I am sure my email is correct'
              />

              <TextField
                label='New password'
                type='password'
                variant='outlined'
                margin='normal'
                id='firstPassword'
                fullWidth
                required
                value={form.firstPassword}
                error={!!error.firstPassword}
                helperText={error.firstPassword}
                onChange={fieldChangeHandler}
                onBlur={onBlurHandler}
              />

              <TextField
                label='Repeat password'
                type='password'
                variant='outlined'
                margin='normal'
                id='secondPassword'
                fullWidth
                required
                value={form.secondPassword}
                onChange={fieldChangeHandler}
                onBlur={onBlurHandler}
              />

              <Button
                variant='outlined'
                type='submit'
                color='primary'
                disabled={spin}
              >
                Recover password
              </Button>
              {token && <Redirect to='/' />}
            </form>
          </div>}
    </div>
  )
}
