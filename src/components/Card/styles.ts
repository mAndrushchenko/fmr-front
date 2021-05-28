import { makeStyles } from '@material-ui/core/styles'

export const styles = makeStyles({
  root: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '220px',
    height: '380px',
    margin: '0 auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  },
  imgContainer: {
    width: '100%',
    height: 240,
    display: 'flex',
    alignItems: 'center'
  },
  image: {
    height: 240,
    width: '100%',
    objectFit: 'cover',
    borderRadius: '5px'
  },
  defaultImage: {
    width: '100%',
    borderRadius: '5px'
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    width: 40,
    height: 30,
    backgroundColor: 'rgb(63,81,181, 0.9)',
    borderRadius: 5
  },
  name: {
    marginTop: 0,
    fontWeight: 'bold',
    fontFamily: 'inherit',
    color: '#3b393f',
    marginBottom: '0',
    fontSize: 16
  },
  price: {
    margin: 0,
    fontSize: 18,
    fontWeight: 600,
    color: '#fff'
  },
  text: {
    padding: '10px 7px 5px',
    height: 100
  },
  author: {
    marginBottom: '10px',
    marginTop: 0,
    color: '#767579'
  },

  btnBuyContainer: {
    transition: '200ms',
    width: '100%',
    height: 20
  },
  btnBuy: {
    width: '100%'
  }
})
