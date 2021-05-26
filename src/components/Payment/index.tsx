import { useCallback, useState, VFC, useRef } from 'react'
import TextField from '@material-ui/core/TextField'
import Modal from '@material-ui/core/Modal'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import InputMask from 'react-input-mask'
import { cardRegexp, cvvRegexp } from 'src/shared/constant/regExp'

import { styles } from './styles'

interface IModalProps {
  label: string,
  buttonClassName?: string
}

export const Payment: VFC<IModalProps> = ({ label, buttonClassName }) => {
  const classes = styles()
  const yearRef = useRef<HTMLInputElement>()

  const [ open, setOpen ] = useState(false)
  const [ card, setCard ] = useState('')
  // const [ date, setDate ] = useState('')
  const [ month, setMonth ] = useState('')
  const [ year, setYear ] = useState('')
  const [ code, setCode ] = useState('')

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const cardHandler = useCallback(
    e => {
      setCard(e.target.value)
    },
    []
  )

  const monthHandler = useCallback(
    e => {
      const data = e.target.value.match(/\d*/)[0]
      setMonth(data)
      if (data.length === 2) {
        yearRef.current?.focus()
      }
    },
    []
  )

  const yearHandler = useCallback(
    e => {
      setYear(e.target.value.match(/\d*/)[0])
    },
    []
  )

  const codeHandler = useCallback(
    e => {
      setCode(e.target.value.match(/\d*/)[0])
    },
    []
  )

  const submitHandler = useCallback(
    e => {
      e.preventDefault()

      if (cardRegexp.test(card) && cvvRegexp.test(code) && +month <= 12 && +month > 0) {
        console.log('send request')
      }
    },
    [ code, card, month, year ]
  )

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        className={classes.modal}
      >
        <form className={classes.form} onSubmit={submitHandler}>
          <Typography variant='h4'>Enter payment information</Typography>
          <InputMask mask='9999 9999 9999 9999' value={card} onChange={cardHandler}>
            {() => (
              <TextField
                id='card-number'
                label='Card number'
                variant='outlined'
                margin='normal'
                color='primary'
                fullWidth
                required
              />)}
          </InputMask>

          <div className={classes.date}>
            <TextField
              id='month'
              label='MM'
              margin='normal'
              color='primary'
              variant='outlined'
              className={classes.month}
              value={month}
              onChange={monthHandler}
              inputProps={{
                maxLength: 2
              }}
              required
            />
            /
            <TextField
              id='year'
              label='YY'
              margin='normal'
              color='primary'
              variant='outlined'
              className={classes.year}
              value={year}
              onChange={yearHandler}
              inputProps={{
                maxLength: 2
              }}
              inputRef={yearRef}
              required
            />
          </div>

          <InputMask mask='999' value={code} onChange={codeHandler}>
            {() => (
              <TextField
                id='cvv'
                label='CVV code'
                variant='outlined'
                margin='normal'
                color='primary'
                fullWidth
                required
              />
            )}
          </InputMask>

          <Button
            type='submit'
            variant='outlined'
            color='primary'
            className={classes.button}
          >
            Purchase
          </Button>
          <strong className={classes.sum}>Sum</strong>
        </form>
      </Modal>
      <Button
        className={buttonClassName}
        onClick={handleOpen}
        variant='outlined'
        color='primary'
      >
        {label}
      </Button>
    </>
  )
}
