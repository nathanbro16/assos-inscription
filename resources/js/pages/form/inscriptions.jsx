import {useRegister} from '@/hooks/registering';
import React, { Children } from 'react';

import { useParams } from 'react-router-dom';

import { 
    useQuery,  
    useQueryClient,  
    useMutation
} from 'react-query';

import { format } from "date-fns";
import fr from 'date-fns/locale/fr';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { 
    LocalizationProvider, 
    DatePicker, 
} from '@mui/x-date-pickers';

import { 
  Switch,
  FormControlLabel,
  Paper, 
  Container, 
  Typography,
  Button,
  Box,
  TextField,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader

} from '@mui/material';

import FormSteps from '@/components/FormSteps';


const FormLegals = () => {
  return (
    <Box sx={{flexWrap: 'wrap', alignItems: 'center' }}>
      <Typography variant='body1' sx={{m:1}} >Merci de renseigner ci-dessous les cordonées des responsables légaux (Si enfant mineur) ou personnes a conntacter.</Typography>
      <Typography variant='h5' sx={{m:1}} >Première personne</Typography>
      <TextField
          label="Nom"
          name='LastName1'
          fullWidth
          variant='filled'
          sx={{ m:1, width: '35ch' }}
      />
      <TextField
          label="Prénom"
          name='FirstName1'
          fullWidth
          variant='filled'
          sx={{ m:1, width: '35ch' }}
      />
      <TextField
          label="Téléphone"
          name='Phone1'
          type='tel'
          fullWidth
          variant='filled'
          sx={{ m:1, width: '35ch' }}
      />
      <Typography variant='h5' sx={{m:1}} >Deuxième personne</Typography>
      <TextField
          label="Nom"
          name='LastName1'
          fullWidth
          variant='filled'
          sx={{ m:1, width: '35ch' }}
      />
      <TextField
          label="Prénom"
          name='FirstName1'
          fullWidth
          variant='filled'
          sx={{ m:1, width: '35ch' }}
      />
      <TextField
          label="Téléphone"
          name='Phone1'
          fullWidth
          variant='filled'
          sx={{ m:1, width: '35ch' }}
      />
   
  </Box>        
  )
}
const Formlicencis = () => {
  return (
    <LocalizationProvider adapterLocale={fr} dateAdapter={AdapterDateFns}>
      <Box sx={{flexWrap: 'wrap', alignItems: 'center' }}>
        <Typography variant='body1' sx={{m:1}} >Merci de renseigner ci-dessous les personnes qui seront licenciés.</Typography>
        <TextField
            label="Nom"
            name='LastName'
            fullWidth
            variant='filled'
            sx={{ m:1, width: '30ch' }}
        />
        <TextField
            label="Prénom"
            name='FirstName'
            fullWidth
            variant='filled'
            sx={{ m:1, width: '30ch' }}
        />
        <TextField
            label="Téléphone"
            name='Phone1'
            type='tel'
            fullWidth
            variant='filled'
            sx={{ m:1, width: '30ch' }}
        />
        <TextField
            label="Adress"
            name='LastName1'
            fullWidth
            variant='filled'
            sx={{ m:1, width: '30ch' }}
        />
        <TextField
            label="Email"
            name='FirstName1'
            fullWidth
            variant='filled'
            sx={{ m:1, width: '35ch' }}
        />
        <FormControl sx={{ m: 1, width: '29ch' }}>
          <DatePicker
              label="Date de naissance"
              maxDate={ new Date() }
              renderInput={(params) => 
              <TextField variant="filled" {...params} />}
          />
        </FormControl>
        <FormControl sx={{ m:1, width: '35ch' }}>
          <InputLabel>Grade</InputLabel>
          <Select
            label="Grade"
            variant='filled'
          >
            <ListSubheader>Certures de couleurs</ListSubheader>
            <MenuItem value={20}>Blanche</MenuItem>
            <MenuItem value={30}>Blanche-Jaune</MenuItem>
            <MenuItem value={10}>Jaune</MenuItem>
            <MenuItem value={30}>Jaune-Orange</MenuItem>
            <MenuItem value={20}>Orange</MenuItem>
            <MenuItem value={30}>Vert</MenuItem>
            <MenuItem value={10}>Bleu</MenuItem>
            <ListSubheader>Dan</ListSubheader>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
    
    </Box>
  </LocalizationProvider>        
  )
}

export default function inscriptions() {
        
    const queryClient = useQueryClient();
    const { status, data, error, isFetching } = useRegister();
    const steps = [
      {
        Name : 'Responsable legals',
        Optional : false,
        Children : <FormLegals/>
      },
      {
        Name : 'Les lienciers',
        Optional : false,
        Children : <Formlicencis/>
      },
      {
        Name : 'Confirmation des informations',
        Optional : false,
        Children : <FormLegals/>
      }
    ];

    return (<div>
      {status === 'loading' ? (
        'Loading...'
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (      
      <React.Fragment>
        <Container maxWidth="lg">
          <FormSteps steps={steps} />
        </Container>
      </React.Fragment>
      )}

  
        
      </div>
    )
}
