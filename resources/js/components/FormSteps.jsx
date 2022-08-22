import React from 'react';

import { 
  Slide,
  Paper, 
  Stepper, 
  Step, 
  StepLabel,
  Typography,
  Button,
  Box
} from '@mui/material';

const fabStyle = {
  position: 'absolute',
  bottom: 16,
};


export default function FormSteps({steps}) {
        
    const [direction, setDirection] = React.useState(Array(steps.length).fill('left'));
    const [translation, setTranslation] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
      return step === 1;
    };
  
    const isStepSkipped = (step) => {
      return skipped.has(step);
    };
  
    const handleNext = () => {
      slideDirection(activeStep + 2, 'left')
      slideDirection(activeStep, 'right')
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }
  
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
      setTranslation(true)

    };
  
    const handleBack = () => {
      slideDirection(activeStep - 1, 'right')
      slideDirection(activeStep, 'left')
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      setTranslation(true)
    };
  
    const handleSkip = () => {
        slideDirection(activeStep + 2, 'left')
        slideDirection(activeStep, 'right')
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }
    
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setTranslation(true)
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
      
    };
    const slideDirection = (nbr, newdirection) => {
      let direct = [...direction];
      direct[nbr] = newdirection;

      setDirection(direct);
    }
    return (
      <React.Fragment>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
               const stepProps = {};
               const labelProps = {};
               if (label.Optional) {
                 labelProps.optional = (
                   <Typography variant="caption">Optional</Typography>
                 );
               }
               if (isStepSkipped(index)) {
                 stepProps.completed = false;
               }
               return (
                 <Step key={index} {...stepProps}>
                   <StepLabel {...labelProps}>{label.Name}</StepLabel>
                 </Step>
               );
             })}
          </Stepper>
          {steps.map((label, index) => (
            <Slide
            key={index}
            direction={direction[index]}
            in={activeStep === index && !translation}
            onEntered={() => setTranslation(false)}
            onExited={() => setTranslation(false)}
            timeout={500}
            mountOnEnter 
            unmountOnExit>
                <Box sx={{display: "flex" }} >
                    <Paper elevation={8} sx={{ flex: 3  }} >
                    {label.Children}
                    </Paper>
                </Box>
          </Slide>
          ))}
          <React.Fragment>
            <Box display="flex" justifyContent="space-between" alignItems="flex-end" >
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Précédent
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
                {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                        Passer
                    </Button>
                )}

              <Button
                disabled={activeStep === steps.length - 1}
                onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Fin' : 'Suivant'}
              </Button>
            </Box>
            
          </React.Fragment>
      </React.Fragment>
    )
}
