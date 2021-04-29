import { VFC, useState, useCallback, useEffect } from 'react'
import { sign } from 'jsonwebtoken'

import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const emailRegexp = /^[a-zA-Z]+[0-9]*([.\-_]?[0-9]*[a-zA-Z]+[0-9]*)*@([.\-_]?[0-9]*[a-zA-Z]+[0-9]*)+\.[a-zA-Z]+$/
const passwordREgexp = /((?=.*[a-z])|(?=.*[а-я])).*((?=.*[A-Z])|(?=.*[А-Я])).*(?=.*\d).*/
const nameRegexp = /^[a-zA-Z]+(\s[a-zA-Z]+)?$/

const nameError = 'Your name should consist only of English letters'
const emailError = 'Check your email. It is incorrect'
const passwordError = 'Paswword must consist of capital and lowercase letters, numbers and be at least 8-symbol length'

const styles = makeStyles({
  root: {
    maxWidth: '1000px',
    minWidth: '350px',
    padding: '30px 30px 0',
    margin: '0 auto'
  },

  button: {
    marginTop: '30px'
  }
})

export const Signup: VFC = () => {
  const classes = styles()

  const [ form, setForm ] = useState({
    email: '',
    name: '',
    firstPassword: '',
    secondPassword: ''
  })

  const [ error, setError ] = useState({
    email: '',
    name: '',
    firstPassword: ''
  })

  const [ isSubmitted, setIsSubmitted ] = useState(false)

  useEffect(() => {
    if (isSubmitted && !error.email && !error.name && !error.firstPassword) {
      const token = sign({
        email: form.email,
        name: form.name,
        password: form.firstPassword
      }, 'ssh')
      console.log(token)
    }
  }, [ isSubmitted, error, form ])

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

    let passwordProblem = ''

    if (form.firstPassword !== form.secondPassword) {
      passwordProblem = 'You password does not match'
    } else if (!passwordREgexp.test(form.firstPassword)) {
      passwordProblem = passwordError
    } else {
      passwordProblem = ''
    }

    setError({
      email: emailRegexp.test(form.email.trim()) ? '' : emailError,
      name: nameRegexp.test(form.name.trim()) ? '' : nameError,
      firstPassword: passwordProblem
    })
  }, [ form ])

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
          value={form.name}
          fullWidth
          onChange={fieldChangeHandler}
          required
          error={!!error.name}
          helperText={error.name}
        />

        <TextField
          label='Email'
          type='email'
          variant='outlined'
          margin='normal'
          id='email'
          value={form.email}
          fullWidth
          onChange={fieldChangeHandler}
          required
          error={!!error.email}
          helperText={error.email}
        />

        <TextField
          label='Password'
          type='password'
          variant='outlined'
          margin='normal'
          id='firstPassword'
          value={form.firstPassword}
          fullWidth
          onChange={fieldChangeHandler}
          required
          error={!!error.firstPassword}
          helperText={error.firstPassword}
        />

        <TextField
          label='Repeat password'
          type='password'
          variant='outlined'
          margin='normal'
          id='secondPassword'
          value={form.secondPassword}
          fullWidth
          onChange={fieldChangeHandler}
          required
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
