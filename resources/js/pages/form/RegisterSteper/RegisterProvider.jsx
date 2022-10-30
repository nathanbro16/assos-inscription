import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export const RegisterContext = React.createContext()

export const RegisterProvider = ({ children, steps }) => {
    const [registerType, setRegisterType] = React.useState("")
    const toggleRegisterType = (value) => {
        setRegisterType(value)
    }

    const [familie, setFamilie] = React.useState({})
    const toggleFamilie = (value) => {
        setFamilie(value)
    }

    const [members, setMembers] = React.useState([])
    const toggleMembers = (value) => {
        setMembers(value)
    }

    const [activeStep, setActiveStep] = React.useState(0);
    const [isChange, setisChange] = React.useState([false, false, false]);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };
    
    const handleBack = () => {
      setActiveStep(activeStep - 1);
    };


 
    return (
        <RegisterContext.Provider value={{ activeStep, handleBack, handleNext, registerType, toggleRegisterType, isChange, steps, toggleFamilie, toggleMembers, familie, members }}>
            {children}
        </RegisterContext.Provider>
    )
}

export const Actions = ({disableNext, onClick}) => {
    const { handleBack, handleNext, activeStep, isChange, steps } = React.useContext(RegisterContext)
    return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
    {activeStep !== 0 && (
      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
        Back
      </Button>
    )}

    <Button
      variant="contained"
      disabled={disableNext}
      onClick={onClick}
      sx={{ mt: 3, ml: 1 }}
    >
      {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
    </Button>
  </Box>
  )
}
