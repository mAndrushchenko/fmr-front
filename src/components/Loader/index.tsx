import { VFC, useState, useCallback, useMemo } from 'react'
import Stepper from '@material-ui/core/Stepper'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Step from '@material-ui/core/Step'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { BookInfo } from './BookInfo'
import type { TBookImageLoader, TBookDataLoader, TUsersBookInfoLoaderUser } from 'src/types/bookLoader'

import { loaderStyles } from './styles'
import { UploadImage } from './UploadImage'
import { UploadBook } from './UploadBook'
import { useDispatch, useSelector } from 'react-redux'
import type { TAppDispatch, TUploadBook } from 'src/types/store'
import {
  uploadBookDataAction,
  uploadBookImageAction,
  uploadBookInfoAction,
  userSelector
} from 'src/store/slices/userSlice'
import { spinnerSelector } from 'src/store/slices/spinnerSlice'
import { bookNameRegexp } from '../../shared/constant/regExp'
import {
  authorError,
  bookInfoError,
  descriptionError, genreError,
  keywordsError,
  nameBookError,
  priceError
} from '../../shared/constant/errorMasseges'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

export const Loader: VFC = () => {
  const classes = loaderStyles()
  const dispatch = useDispatch<TAppDispatch>()
  const { spin } = useSelector(spinnerSelector)
  const { token } = useSelector(userSelector)
  const steps: string[] = useMemo(() => [
    'Add book information', 'Upload book image', 'Upload book file'
  ], [])

  const [ adminBookInfo, setAdminBookInfo ] = useState<TUploadBook | null>(null)
  const [ userBookInfo, setUserBookInfo ] = useState<TUsersBookInfoLoaderUser | null>(null)
  const [ bookData, setBookData ] = useState<TBookDataLoader | null>(null)
  const [ bookImage, setBookImage ] = useState<TBookImageLoader | null>(null)
  const [ activeStep, setActiveStep ] = useState(0)
  const [ error, setError ] = useState('')

  const handleBack = useCallback(() => {
    setActiveStep(activeStep - 1 || 0)
  }, [ activeStep ])

  const handleAdminBookInfo = useCallback((info: TUploadBook | null) => {
    setAdminBookInfo(info)
  }, [])

  const handleUserBookInfo = useCallback((info: TUsersBookInfoLoaderUser | null) => {
    setUserBookInfo(info)
  }, [])

  const handleBookImage = useCallback((image: TBookImageLoader) => {
    setBookImage(image)
  }, [])

  const handleBookData = useCallback((data: TBookDataLoader) => {
    setBookData(data)
  }, [])

  const closeHandler = useCallback(() => {
    setError('')
  }, [])

  const checkAdminFields = useCallback(() => {
    if (!adminBookInfo) {
      setError(bookInfoError)
      return false
    } else if (!bookNameRegexp.test(adminBookInfo.name.trim())) {
      setError(nameBookError)
      return false
    } else if (!adminBookInfo.genre) {
      setError(genreError)
      return false
    } else if (!adminBookInfo.author) {
      setError(authorError)
      return false
    } else if (!adminBookInfo.description) {
      setError(descriptionError)
      return false
    } else if (!adminBookInfo.keywords) {
      setError(keywordsError)
      return false
    } else if (adminBookInfo.price < 0) {
      setError(priceError)
      return false
    } else {
      return true
    }
  }, [ adminBookInfo, token ])

  const handleNext = useCallback(() => {
    // send request
    if (activeStep === 0) {
      if (!checkAdminFields() || !adminBookInfo) {
        return
      }
      dispatch(uploadBookInfoAction({ token, bookInfo: adminBookInfo }))
    } else if (activeStep === 1 && bookImage) {
      console.log(bookData)
      dispatch(uploadBookImageAction({ token, bookImage }))
    } else if (activeStep === 2 && bookData) {
      console.log(bookData)
      dispatch(uploadBookDataAction({ token, bookData }))
    }
    setActiveStep(activeStep + 1)
  }, [ activeStep, adminBookInfo, bookImage, bookData, token ])

  const handleReset = useCallback(() => {
    setActiveStep(0)
  }, [ activeStep ])

  const handleSkip = useCallback(() => {
    setActiveStep(activeStep + 1)
  }, [ activeStep ])
  return (
    <>
      <div className={classes.root}>
        <div>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        <div>
          {activeStep === steps.length ? (
            <>
              <Typography variant='h3'>All steps completed. You&apos;re finished</Typography>
              <Button variant='contained' color='primary' onClick={handleReset}>Go back</Button>
            </>
          ) : (
            <>
              <Typography className={classes.title} variant='h4'>{steps[activeStep]}</Typography>
              {activeStep === 0 && <BookInfo
                handleAdminBookInfo={handleAdminBookInfo}
                handleUserBookInfo={handleUserBookInfo}
              />}
              {activeStep === 1 && <UploadImage handleBookImage={handleBookImage}/>}
              {activeStep === 2 && <UploadBook handleBookData={handleBookData}/>}
              <Divider className={classes.divider}/>
              <div>
                <Button
                  color='primary'
                  variant='contained'
                  className={classes.stepperButton}
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  Back
                </Button>
                {
                  activeStep === 1 &&
                  <Button
                    color='primary'
                    variant='contained'
                    className={classes.stepperButton}
                    onClick={handleSkip}
                  >
                    Skip
                  </Button>
                }
                <Button
                  color='primary'
                  variant='contained'
                  className={classes.stepperButton}
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? 'send book' : 'next'}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={!!error}
        autoHideDuration={3000}
        onClose={closeHandler}
      >
        <Alert severity='warning'>{error}</Alert>
      </Snackbar>
    </>
  )
}
