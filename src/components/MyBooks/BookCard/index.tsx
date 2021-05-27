import { useCallback, VFC } from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from '@material-ui/core'
import type { TId } from 'src/types/store'
import { useStyles } from './styles'

interface BookCardProps {
  id: TId['id']
  name: string
  image: string
  author: string
  onClick?: (id: TId['id']) => void
}

export const BookCard: VFC<BookCardProps> = ({
  id,
  name,
  image,
  author,
  onClick
}) => {
  const classes = useStyles()
  const cardClickHandler = useCallback(() => onClick?.(id), [ onClick ])

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={cardClickHandler}>
        <CardMedia
          className={classes.media}
          image={image}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {name}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {author}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
