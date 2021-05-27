import { VFC, useState, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Stepper from '@material-ui/core/Stepper'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Step from '@material-ui/core/Step'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import {
  userSelector,
  uploadBookDataAction,
  uploadBookInfoAction,
  uploadBookImageAction
} from 'src/store/slices/userSlice'
import {
  genreError,
  priceError,
  authorError,
  bookInfoError,
  keywordsError,
  nameBookError,
  uploadBookError,
  descriptionError,
  uploadImageError
} from 'src/shared/constant/errorMasseges'
import { bookNameRegexp } from 'src/shared/constant/regExp'
import { BookInfo } from './BookInfo'
import type {
  TBookDataLoader,
  TBookImageLoader,
  TUsersBookInfoLoaderUser
} from 'src/types/bookLoader'

import { UploadImage } from './UploadImage'
import { UploadBook } from './UploadBook'
import type { TAppDispatch, TUploadBook } from 'src/types/store'

import { loaderStyles } from './styles'

export const Loader: VFC = () => {
  const classes = loaderStyles()
  const dispatch = useDispatch<TAppDispatch>()
  const steps: string[] = useMemo(() => [
    'Add book information', 'Upload book image', 'Upload book file'
  ], [])

  const { token, isAdmin } = useSelector(userSelector)

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
    let result = false
    if (!adminBookInfo) {
      setError(bookInfoError)
    } else if (!bookNameRegexp.test(adminBookInfo.name.trim())) {
      setError(nameBookError)
    } else if (!adminBookInfo.genre) {
      setError(genreError)
    } else if (!adminBookInfo.author) {
      setError(authorError)
    } else if (!adminBookInfo.description) {
      setError(descriptionError)
    } else if (!adminBookInfo.keywords) {
      setError(keywordsError)
    } else if (adminBookInfo.price < 0) {
      setError(priceError)
    } else {
      result = true
    }
    return result
  }, [ adminBookInfo ])

  const checkUserFields = useCallback(() => {
    let result = false
    if (!userBookInfo) {
      setError(bookInfoError)
    } else if (!bookNameRegexp.test(userBookInfo.name.trim())) {
      setError(nameBookError)
    } else if (!userBookInfo.author) {
      setError(authorError)
    } else if (!userBookInfo.genre) {
      setError(genreError)
    } else {
      result = true
    }
    return result
  }, [ userBookInfo ])

  const resetFormData = useCallback(() => {
    setAdminBookInfo(null)
    setUserBookInfo(null)
    setBookData(null)
    setBookImage(null)
  }, [])

  const handleNext = useCallback(() => {
    if (activeStep === 0 && isAdmin) {
      if (!checkAdminFields() || !adminBookInfo) {
        return
      }
      dispatch(uploadBookInfoAction({ bookInfo: adminBookInfo }))
    } else if (activeStep === 0 && !isAdmin) {
      if (!checkUserFields() || !userBookInfo) {
        return
      }
      dispatch(uploadBookInfoAction({ bookInfo: userBookInfo }))
    } else if (activeStep === 1) {
      if (!bookImage) {
        return setError(uploadImageError)
      }
      dispatch(uploadBookImageAction({ bookImage }))
    } else if (activeStep === 2) {
      if (!bookData) {
        return setError(uploadBookError)
      }
      dispatch(uploadBookDataAction({ bookData }))
      resetFormData()
    }
    setActiveStep(activeStep + 1)
  }, [ activeStep, adminBookInfo, userBookInfo, bookImage, bookData, token ])

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
              {activeStep === 0 &&
              <BookInfo handleAdminBookInfo={handleAdminBookInfo} handleUserBookInfo={handleUserBookInfo} />}
              {activeStep === 1 && <UploadImage handleBookImage={handleBookImage} />}
              {activeStep === 2 && <UploadBook handleBookData={handleBookData} />}
              <Divider className={classes.divider} />
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
