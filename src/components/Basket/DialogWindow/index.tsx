import { VFC } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

interface IDialogProps {
  open: boolean
  agreeHandler: () => void
  disagreeHandler: () => void
}

export const DialogWindow: VFC<IDialogProps> = ({ open, agreeHandler, disagreeHandler }) => (
  <Dialog
    open={open}
    onClose={disagreeHandler}
    aria-labelledby='alert-dialog-title'
    aria-describedby='alert-dialog-description'
  >
    <DialogTitle id='alert-dialog-title'>Remove this book from basket?</DialogTitle>
    <DialogContent>
      <DialogContentText id='alert-dialog-description'>
        Are you sure that you wanna remove this book from your basket?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={disagreeHandler} color='primary'>
        Disagree
      </Button>
      <Button onClick={agreeHandler} color='primary' autoFocus>
        Agree
      </Button>
    </DialogActions>
  </Dialog>
)
