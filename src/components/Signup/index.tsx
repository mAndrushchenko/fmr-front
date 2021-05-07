import { VFC, useState, useCallback } from 'react'
import { sign } from 'jsonwebtoken'

import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { useDispatch } from 'react-redux'
import { TAppDispatch } from 'src/types/store'
import { signupUserAction } from 'src/store/slices/userSlice'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const emailRegexp = /^[a-zA-Z]+[0-9]*([.\-_]?[0-9]*[a-zA-Z]+[0-9]*)*@([.\-_]?[0-9]*[a-zA-Z]+[0-9]*)+\.[a-zA-Z]+$/
const passwordRegexp = /((?=.*[a-z])|(?=.*[а-я])).*((?=.*[A-Z])|(?=.*[А-Я])).*(?=.*\d).*/
const nameRegexp = /^[a-zA-Z]+(\s[a-zA-Z]+)?$/

const nameError = 'Your name should consist only of English letters'
const emailError = 'Check your email. It is incorrect'
const passwordError = 'Password must consist of capital and lowercase letters, numbers and be at least 8-symbol length'

const styles = makeStyles({
  root: {
    maxWidth: '1000px',
    padding: '30px 30px 0',
    margin: '0 auto'
  },

  button: {
    marginTop: '30px'
  }
})

export const Signup: VFC = () => {
  const classes = styles()
  const dispatch = useDispatch<TAppDispatch>()

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
    let passwordProblem = ''

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
  }, [ form ])

  const onBlurHandler = useCallback(() => {
    setError(validation())
  }, [ form ])

  const submitHandler = useCallback(e => {
    e.preventDefault()

    const newError = validation()

    if (!newError.email && !newError.name && !newError.firstPassword) {
      const token = sign({
        email: form.email,
        name: form.name,
        password: form.firstPassword
      }, 'ssh')
      dispatch(signupUserAction({ token }))
      console.log(token)
    }
    setError(newError)
  }, [ dispatch, form ])

  return (
    <div className={classes.root}>
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
        >
          Sign up
        </Button>
      </form>
    </div>
  )
}
