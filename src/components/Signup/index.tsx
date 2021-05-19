import { VFC, useState, useCallback } from 'react'
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
import { TAppDispatch } from 'src/types/store'
import { signupUserAction, userSelector } from 'src/store/slices/userSlice'
import { passwordRegexp, emailRegexp, nameRegexp } from 'src/shared/constant/regExp'
import { passwordError, emailError, nameError } from 'src/shared/constant/errorMasseges'
import { AfterRegComp } from './AfterRegComp'
import { styles } from './styles'
import { spinnerSelector, startSpin } from '../../store/slices/spinnerSlice'


export const Signup: VFC = () => {
  const classes = styles()
  const dispatch = useDispatch<TAppDispatch>()
  const { token } = useSelector(userSelector)
  const { spin, error: err } = useSelector(spinnerSelector)
  const [ register, setRegister ] = useState(false)
  const [ form, setForm ] = useState({
    email: '',
    name: '',
    firstPassword: '',
    secondPassword: ''
  })
  const [ ignoreEmail, setIgnore ] = useState(false)
  const [ error, setError ] = useState({
    email: '',
    name: '',
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
      name: nameRegexp.test(form.name.trim()) ? '' : nameError,
      firstPassword: passwordProblem
    }
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

  const onBlurHandler = useCallback(() => {
    setError(validation())
  }, [ form ])

  const submitHandler = useCallback(e => {
    e.preventDefault()

    const newError = validation()

    if (!newError.email && !newError.name && !newError.firstPassword) {
      const newToken = sign({
        email: form.email,
        name: form.name,
        password: form.firstPassword
      }, 'ssh')
      dispatch(startSpin())
      dispatch(signupUserAction({ token: newToken }))
      setRegister(true)
    }
    setError(newError)
  }, [ dispatch, form ])

  return (
    <div className={classes.root}>
      {(register && !spin && !err)
        ? <AfterRegComp />
        : <div className={classes.singnup}>
            <Typography variant='h4'>
                Sign-up to start using our service with all features.
            </Typography>

            <form onSubmit={submitHandler}>
              <TextField
                label='Name'
                type='text'
                variant='outlined'
                margin='normal'
                id='name'
                fullWidth
                required
                value={form.name}
                error={!!error.name}
                helperText={error.name}
                onChange={fieldChangeHandler}
                onBlur={onBlurHandler}
              />

              <TextField
                label='Email'
                type='email'
                variant='outlined'
                margin='normal'
                id='email'
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
                label='Password'
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
                type='submit'
                variant='outlined'
                color='primary'
                className={classes.button}
                disabled={spin}
              >
                Sign up
              </Button>
            </form>
          </div>}
      {token && <Redirect to='/' />}
    </div>
  )
}
