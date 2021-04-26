import { VFC, useState, useCallback, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const emailRegexp = /^[a-zA-Z]+[0-9]*([.\-_]?[0-9]*[a-zA-Z]+[0-9]*)*@([.\-_]?[0-9]*[a-zA-Z]+[0-9]*)+\.[a-zA-Z]+$/
const passwordREgexp = /((?=.*[a-z])|(?=.*[а-я])).*((?=.*[A-Z])|(?=.*[А-Я])).*(?=.*\d).*/
const nameRegexp = /^[a-zA-Z]+(\s[a-zA-Z]+)?$/

const styles = makeStyles({
  root: {
    maxWidth: '1000px',
    minWidth: '350px',
    padding: '30px 30px 0',
    margin: '0 auto',
  },

  button: {
    marginTop: '30px'
  }
})

export const Signup: VFC = () => {
  const classes = styles()

  const [form, setForm] = useState({
    email: '',
    name: '',
    firstPassword: '',
    secondPassword: '',
  })

  const [error, setError] = useState({
    email: '',
    name: '',
    firstPassword: '',
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (isSubmitted && !error.email && !error.name && !error.firstPassword ) {
      console.log('send form')
    }
  }, [isSubmitted, error, form])

  const fieldChangeHandler = useCallback(e => {
    setIsSubmitted(false)

    setForm({
      ...form,
      [e.target.id]: e.target.value,
    })
  }, [form])

  const submitHandler = useCallback(e => {
    e.preventDefault()

    setIsSubmitted(true)

    setError({
      email: emailRegexp.test(form.email.trim()) ? '' : 'Check your email. It is incorrect',
      name: nameRegexp.test(form.name.trim()) ? '' : 'Your name should consist only of English letters',
      firstPassword: form.secondPassword !== form.firstPassword ? `Your password doesn't match` : 
        passwordREgexp.test(form.firstPassword) ? '' : 'Password must consist of English capitals and lowercase letters and numbers and be at least 8-symbol length',
    })

  }, [form])

  return (
    <div className={classes.root}>
      <h1>Sign-up to start using our service with all features.</h1>

      <form onSubmit={submitHandler}>
        <TextField
          label="Name"
          type="text"
          variant="outlined"
          margin="normal"
          id="name"
          value={form.name}
          fullWidth={true}
          onChange={fieldChangeHandler}
          required={true}
          error={!!error.name}
          helperText={error.name}
        />

        <TextField
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          id="email"
          value={form.email}
          fullWidth={true}
          onChange={fieldChangeHandler}
          required={true}
          error={!!error.email}
          helperText={error.email}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          id="firstPassword"
          value={form.firstPassword}
          fullWidth={true}
          onChange={fieldChangeHandler}
          required={true}
          error={!!error.firstPassword}
          helperText={error.firstPassword}
        />

        <TextField
          label="Repeat password"
          type="password"
          variant="outlined"
          margin="normal"
          id="secondPassword"
          value={form.secondPassword}
          fullWidth={true}
          onChange={fieldChangeHandler}
          required={true}
        />

        <Button
          type="submit"
          variant="outlined"
          color="primary"
          className={classes.button}
        >Sign up</Button>
      </form>
    </div>
  )
}