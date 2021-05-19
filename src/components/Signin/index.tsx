import { VFC, useState, useCallback } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { sign } from 'jsonwebtoken'

import {
  Button,
  Checkbox,
  TextField,
  Typography,
  FormControlLabel,
  CircularProgress
} from '@material-ui/core'

import { useDispatch, useSelector } from 'react-redux'
import { emailRegexp, passwordRegexp } from 'src/shared/constant/regExp'
import { passwordError, emailError } from 'src/shared/constant/errorMasseges'
import { signinUserAction, userSelector } from 'src/store/slices/userSlice'
import { spinnerSelector, startSpin } from 'src/store/slices/spinnerSlice'
import { TAppDispatch } from 'src/types/store'

import { styles } from './styles'

export const Signin: VFC = () => {
  const classes = styles()
  const dispatch = useDispatch<TAppDispatch>()
  const { token } = useSelector(userSelector)
  const { spin } = useSelector(spinnerSelector)
  const [ form, setForm ] = useState({
    email: '',
    password: ''
  })

  const [ ignoreEmail, setIgnore ] = useState(false)

  const [ error, setError ] = useState({
    email: '',
    password: ''
  })

  const validation = useCallback(() => ({
    email: (ignoreEmail || emailRegexp.test(form.email)) ? '' : emailError,
    password: passwordRegexp.test(form.password) ? '' : passwordError
  }), [ form, ignoreEmail ])

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

    if (!newError.email && !newError.password) {
      const newToken = sign({
        email: form.email,
        password: form.password
      }, 'ssh')
      dispatch(startSpin())
      dispatch(signinUserAction({ token: newToken }))
    }
    setError(newError)
  }, [ dispatch, form ])

  const onBlurHandler = useCallback(() => {
    setError(validation())
  }, [ validation ])

  return (
    <div className={classes.root}>
      <Typography variant='h4'>
        Sign in the system before you continue using site.
      </Typography>

      <p>
        Haven&apos;t registered yet?&nbsp;
        <Link to='/signup'>Create account now</Link>
        &nbsp;and start using all features of our product!
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
          id='password'
          label='Password'
          type='password'
          variant='outlined'
          margin='normal'
          fullWidth
          required
          value={form.password}
          error={!!error.password}
          helperText={error.password}
          onChange={fieldChangeHandler}
          onBlur={onBlurHandler}
        />

        <Link
          to='/password-recovery'
          className={classes.link}
        >
          Forgot password?
        </Link>

        <Button
          variant='outlined'
          type='submit'
          color='primary'
          disabled={spin}
        >
          Login
        </Button>
        {token && <Redirect to='/' />}
        {spin && <div className={classes.spinner}><CircularProgress /></div>}
      </form>
    </div>
  )
}
