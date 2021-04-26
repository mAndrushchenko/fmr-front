import { VFC, useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const emailRegexp = /^[a-zA-Z]+[0-9]*([.\-_]?[0-9]*[a-zA-Z]+[0-9]*)*@([.\-_]?[0-9]*[a-zA-Z]+[0-9]*)+\.[a-zA-Z]+$/
const passwordRegexp = /((?=.*[a-z])|(?=.*[а-я])).*((?=.*[A-Z])|(?=.*[А-Я])).*(?=.*\d).*/

const emailError = 'Check your email. It is incorrect'
const passwordError = 'Paswword must consist of capital and lowercase letters, numbers and be at least 8-symbol length'

const styles = makeStyles({
  root: {
    maxWidth: '900px',
    margin: '0 auto',
    minWidth: '300px',
    padding: '30px 30px 0'
  },

  link: {
    display: 'block',
    margin: '10px 0 20px'
  }
})

export const Signin: VFC = () => {
  const classes = styles()

  const [ form, setForm ] = useState({
    email: '',
    password: ''
  })

  const [ isSubmitted, setIsSubmitted ] = useState(false)

  const [ error, setError ] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    if (isSubmitted && !error.email && !error.password) {
      console.log('send request')
    }
  }, [ isSubmitted, error ])

  const fieldChangeHandler = useCallback(e => {
    setIsSubmitted(false)

    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
  }, [ form ])

  const submitHandler = useCallback(e => {
    e.preventDefault()

    setIsSubmitted(true)

    setError({
      email: emailRegexp.test(form.email) ? '' : emailError,
      password: passwordRegexp.test(form.password) ? '' : passwordError
    })
  }, [ form ])

  return (
    <div className={classes.root}>
      <h1>Sign in the system before you continue using site.</h1>

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
          onChange={fieldChangeHandler}
          error={!!error.email}
          helperText={error.email}
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
          onChange={fieldChangeHandler}
          error={!!error.password}
          helperText={error.password}
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
          Sign in
        </Button>
      </form>
    </div>
  )
}
