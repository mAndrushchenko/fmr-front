import { makeStyles } from '@material-ui/core/styles'

export const styles = makeStyles({
  slider: {
    position: 'relative',
    padding: '0 30px',
    // setting the way to display content
    '& .slick-track': {
      display: 'flex'
    },
    '& .slick-slide': {
      flexShrink: 0
    },
    '& .slick-list': {
      overflow: 'hidden'
    },
    // desgning buttons
    '& .slick-arrow': {
      position: 'absolute',
      top: '50%',
      fontSize: 0,
      background: 'none',
      zIndex: 1000,
      // creating arrow
      border: 'solid black',
      borderWidth: '0 3px 3px 0',
      display: 'inline-block',
      padding: '10px',
      transition: 'all 0.3s ease-in-out',
      '&.slick-prev': {
        left: '10px',
        transform: 'translateY(-50%) rotate(135deg)'
      },
      '&.slick-next': {
        right: '10px',
        transform: 'translateY(-50%) rotate(-45deg)'
      },
      '&.slick-disabled': {
        borderColor: 'grey'
      }
    }
  }
})
