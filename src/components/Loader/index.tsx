import { VFC, useState, useCallback } from 'react'
import Stepper from '@material-ui/core/Stepper'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Step from '@material-ui/core/Step'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { BookInfo } from './BookInfo'

import { loaderStyles } from './styles'
import { UploadImage } from './UploadImage'
import { UploadBook } from './UploadBook'

const getStepContent = (step: number) => {
  switch (step) {
    case 0:
      return <BookInfo />
    case 1:
      return <UploadImage />
    case 2:
      return <UploadBook />
    default:
      return <BookInfo />
  }
}

export const Loader: VFC = () => {
  const classes = loaderStyles()
  const [ activeStep, setActiveStep ] = useState(0)
  const steps: string[] = [ 'Add book information', 'Upload book image', 'Upload book file' ]

  const handleBack = useCallback(() => {
    setActiveStep(activeStep - 1 || 0)
  }, [ activeStep ])

  const handleNext = useCallback(() => {
    // send request
    setActiveStep(activeStep + 1)
  }, [ activeStep ])

  const handleReset = useCallback(() => {
    setActiveStep(0)
  }, [ activeStep ])

  const handleSkip = useCallback(() => {
    setActiveStep(activeStep + 1)
  }, [ activeStep ])

  return (
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
            {getStepContent(activeStep)}
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
  )
}
