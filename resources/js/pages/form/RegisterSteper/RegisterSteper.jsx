import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import _ from "lodash";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import FamilieForm from '@/pages/form/RegisterSteper/FamilieForm';
import IntroForm from '@/pages/form/RegisterSteper/IntroForm';
import ResumForm from '@/pages/form/RegisterSteper/ResumForm';


import MembersForm from '@/pages/form/RegisterSteper/MembersForm'; 
import Footer from '@/components/Layouts/footer';
import { useFormContext } from 'react-hook-form';


const steps = ['Introduction', 'Dossier', 'licencié', 'Résumé'];

function getStepContent(activeStep, formContent, Register) {
  switch (activeStep) {
    case 0:
      return <IntroForm {...{ formContent }} Register={Register} />;
    case 1:
      return <FamilieForm {...{ formContent }} Register={Register} />;
    case 2:
      return <MembersForm {...{ formContent }} Register={Register} />;
    case 3:
      return <ResumForm {...{ formContent }} Register={Register} />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function RegisterSteper({Register}) {

  const { watch, formState: { errors }, trigger } = useFormContext();
  const [activeStep, setActiveStep] = React.useState(0);
  const [compiledForm, setCompiledForm] = React.useState({});
  const form = watch();

  const handleNext = async () => {
    let canContinue = false;

    switch (activeStep) {
      case 0:
        canContinue = await trigger(['TypeIns'], { shouldFocus: true });

        if (canContinue) {
          setCompiledForm({ ...compiledForm, one: form });
        }
        break;
      case 1:
        canContinue = await trigger(['Email1', 'Email2', 'Phone1', 'Phone2', 'FirstName1', 'FirstName2', 'LastName1', 'LastName2'], { shouldFocus: true });
        if (canContinue) {
          setCompiledForm({ ...compiledForm, two: form });
        }
        break;
      case 2:
        canContinue = await trigger(['Members'], { shouldFocus: true });
        if (canContinue) {
          setCompiledForm({ ...compiledForm, three: form });
        }
        break;
      case 3:
          canContinue = await trigger();
          canContinue = handleSubmit(form);
          break;
      default:
        return "not a valid step";
    }
    if (canContinue) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
      switch (activeStep) {
        case 1:
          setCompiledForm({ ...compiledForm, two: form });
          break;
        case 2:
          setCompiledForm({ ...compiledForm, three: form });
          break;
        default:
          return "not a valid step";
      }
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompiledForm({});
  };

  const handleSubmit = form => {

    const id = Register.id

    if (_.isEmpty(errors)) {
      console.log("submit", {...form, id });
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            {Register.Title}
          </Typography>
                <React.Fragment>
                  <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  <React.Fragment>
                    {activeStep === steps.length ? (
                      <React.Fragment>
                        <Typography variant="h5" gutterBottom>
                          Thank you for your order.
                        </Typography>
                        <Typography variant="subtitle1">
                          Your order number is #2001539. We have emailed your order
                          confirmation, and will send you an update when your order has
                          shipped.
                        </Typography>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {getStepContent(activeStep, compiledForm, Register)}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          {activeStep !== 0 && (
                            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                              Retour
                            </Button>
                          )}

                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 3, ml: 1 }}
                          >
                            {activeStep === steps.length - 1 ? 'Valider' : 'Suivant'}
                          </Button>
                        </Box>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                </React.Fragment>
          
        </Paper>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}