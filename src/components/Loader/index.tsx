import { VFC, useState, useCallback } from 'react'
import Stepper from '@material-ui/core/Stepper'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Step from '@material-ui/core/Step'
import { BookInfo } from './BookInfo'
import { AdminForm } from './AdminForm'
import { UserForm } from './UserForm'

import { loaderStyles } from './styles'
import { Typography } from '@material-ui/core'

const getStepContent = (step: number) => {
  switch (step) {
    case 0:
      return <BookInfo />
    case 1:
      return <AdminForm />
    case 2:
      return <UserForm />
    default:
      return <BookInfo />
  }
}

export const Loader: VFC = () => {
  const classes = loaderStyles()
  const [ activeStep, setActiveStep ] = useState(0)
  const [ skipped, setIsSkipped ] = useState(new Set<number>())
  const steps: string[] = [ 'Add book information', 'Upload book image', 'Upload book file' ]

  const handleBack = useCallback(() => {
    setActiveStep(activeStep - 1 || 0)
  }, [ activeStep ])

  const handleNext = useCallback(() =>{
    setActiveStep(activeStep + 1)
  }, [ activeStep ])

  const handleReset = useCallback(() => {
    setActiveStep(0)
  }, [ activeStep ])

  return (
    <div className={classes.root}>
      <div>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            )
          })}
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
            {getStepContent(activeStep)}
            <div>
              <Button color='primary' variant='contained' disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              {
                activeStep === 1 &&
                <Button color='primary' variant='contained'>
                  Skip
                </Button>
              }
              <Button color='primary' variant='contained' onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'send book' : 'next'}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
