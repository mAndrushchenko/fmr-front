import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const styles = makeStyles((theme: Theme) =>
  createStyles({
    slider: {
      position: 'relative',
      [theme.breakpoints.up('md')]: {
        display: 'none'
      },
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
        // disablded arrows
        '&.slick-disabled': {
          borderColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    },
    sliderScroll: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'auto',
        width: '100%',
        padding: '0 1rem'
      },
      // disappearing scroll bar
      '&::-webkit-scrollbar': {
        height: 0,
        width: 0
      }
    },
    sliderScrollItem: {
      flexShrink: 0,
      margin: '0 1rem',
      '&:last-child': {
        paddingRight: '1rem'
      },
      '&:first-child': {
        marginLeft: 0
      }
    }
  }))
