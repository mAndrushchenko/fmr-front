import { VFC, ChangeEvent, useEffect } from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import { genres } from 'src/shared/constant/genres'
import { styles } from './styles'

interface IGenres {
  value: string,
  setValue: (e: ChangeEvent<{ value: unknown }>) => void,
  className?: string
}

export const Genres: VFC<IGenres> = ({ value, setValue, className }) => {
  const classes = styles()

  // counting re-renders
  useEffect(() => {
    console.log('genres re-render')
  })

  return (
    <FormControl variant='outlined' className={`${className} ${classes.root}`} margin='normal' required>
      <InputLabel id='genre-label'>Genre</InputLabel>
      <Select
        labelId='genre-label'
        label='Genre'
        id='genre'
        value={value}
        onChange={setValue}
        className={classes.selectValue}
      >
        {genres.map(genre => (
          <MenuItem key={genre} className={classes.genreText} value={genre}>{genre}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
