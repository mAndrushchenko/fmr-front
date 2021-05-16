import { VFC, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { sign } from 'jsonwebtoken'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'

import { styles } from './styles'

const emailRegexp = /^[a-zA-Z]+[0-9]*([.\-_]?[0-9]*[a-zA-Z]+[0-9]*)*@([.\-_]?[0-9]*[a-zA-Z]+[0-9]*)+\.[a-zA-Z]+$/
const passwordRegexp = /((?=.*[a-z])|(?=.*[а-я])).*((?=.*[A-Z])|(?=.*[А-Я])).*(?=.*\d).*/

const emailError = 'Check your email. It is incorrect'
const passwordError = 'Password must consist of capital and lowercase letters, numbers and be at least 8-symbol length'

export const Signin: VFC = () => {
  const classes = styles()

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
  }
  ), [ form, ignoreEmail ])

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
      email: (e.target.checked || emailRegexp.test(form.email)) ? '' : emailError
    })
  }, [ form ])

  const submitHandler = useCallback(e => {
    e.preventDefault()

    const newError = validation()

    if (!newError.email && !newError.password) {
      const token = sign({
        email: form.email,
        password: form.password
      }, 'ssh')
      console.log(token)
    }
    setError(newError)
  }, [ form ])

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
          to='/reset-password'
          className={classes.link}
        >
          Forgot password?
        </Link>

        <Button
          variant='outlined'
          type='submit'
          color='primary'
        >
          Login
        </Button>
      </form>
    </div>
  )
}
