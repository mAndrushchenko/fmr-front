import { VFC, ChangeEvent } from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import { genres } from 'src/shared/constant/genres'
import { styles } from './styles'

export const Genres: VFC<{ value: string, setValue: (e: ChangeEvent<{ value: unknown }>) => void }> = ({ value, setValue }) => {
  const classes = styles()

  return (
    <FormControl variant='outlined' fullWidth margin='normal' required>
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
