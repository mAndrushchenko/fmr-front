import { VFC, useState, useCallback } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const emailRegexp = /^[a-zA-Z]+[0-9]*([.\-_]?[0-9]*[a-zA-Z]+[0-9]*)*@([.\-_]?[0-9]*[a-zA-Z]+[0-9]*)+\.[a-zA-Z]+$/
const passwordRegexp = /((?=.*[a-z])|(?=.*[а-я])).*((?=.*[A-Z])|(?=.*[А-Я])).*(?=.*\d).*/

const styles = makeStyles({
  root: {
    maxWidth: '900px',
    margin: '0 auto',
    minWidth: '300px',
    padding: '30px 30px 0',
  },

  button: {
    marginTop: '20px',
  },
})

export const Signin: VFC = () => {
  const classes = styles()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({
    email: '',
    password: '',
  })

  const emailHandler = useCallback(e => {
    setEmail(e.target.value.trim())
  }, [])

  const passwordHandler = useCallback(e => {
    setPassword(e.target.value.trim())
  }, [])

  const submitHandler = useCallback(e => {
    e.preventDefault()

    setError({
      email: emailRegexp.test(email) ? '' : 'Check your email. It is incorrect',
      password: passwordRegexp.test(password) ? '' : 'Paswword must consist of capital and lowercase letters, numbers and be at least 8-symbol length'
    })

  }, [email, password])

  return (
    <div className={classes.root}>
      <h1>Sign in the system before you continue using site.</h1>

      <form onSubmit={submitHandler}>
        <TextField 
          label="Email" 
          id="email" 
          type="email" 
          variant="outlined" 
          margin="normal" 
          required={true} 
          fullWidth={true}
          value={email} 
          onChange={emailHandler} 
          error={!!error.email} 
          helperText={error.email}
        />

        <TextField 
          id="password" 
          label="Password" 
          type="password" 
          variant="outlined" 
          margin="normal"
          fullWidth={true}
          required={true} 
          value={password} 
          onChange={passwordHandler} 
          error={!!error.password} 
          helperText={error.password} 
        />

        <Button 
          variant="outlined" 
          type="submit" 
          color="primary"
          className={classes.button}
        >
          Sign in
        </Button>
      </form>
    </div>
  )
}