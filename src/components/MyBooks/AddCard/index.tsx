import { VFC } from 'react'
import {
  Card,
  CardActionArea,
  Typography
} from '@material-ui/core'
import { useStyles } from './styles'

interface AddCardProps {
  onClick?: () => void
}

export const AddCard: VFC<AddCardProps> = ({ onClick }) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.innerBorder} onClick={onClick}>
        <Typography className={classes.title} gutterBottom variant='h5'>
          Add new book
        </Typography>
      </CardActionArea>
    </Card>
  )
}
