import { makeStyles } from '@material-ui/core/styles'

export const styles = makeStyles({
  root: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '220px',
    height: '370px'
  },
  image: {
    width: '100%',
    height: '270px',
    objectFit: 'cover',
    borderRadius: '5px'
  },
  name: {
    marginTop: 0,
    fontWeight: 'bold',
    fontFamily: 'inherit',
    color: '#3b393f',
    marginBottom: '0',
    fontSize: 16
  },
  text: {
    padding: '10px 7px 5px'
  },
  author: {
    marginBottom: '10px',
    marginTop: 0,
    color: '#767579'
  },
  price: {
    margin: 0,
    fontSize: 18,
    fontWeight: 600
  }
})
