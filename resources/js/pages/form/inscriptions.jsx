import {useRegister} from '@/hooks/registering';
import React, { Children } from 'react';

import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import { useParams } from 'react-router-dom';

import { 
    useQuery,  
    useQueryClient,  
    useMutation
} from '@tanstack/react-query';

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

import RegisterSteper from '@/pages/form/RegisterSteper/RegisterSteper';
import { useForm, FormProvider } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';





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

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const preloade = { FirstName: "", LastName: "", Email: "", Phone: "", Address: "", Birthday: null, Rank: null }
  const schema = yup.object({
    TypeIns: yup.string().nullable().required("Merci de séléctioner une case"),
    Email1 : yup.string().email("Email non valide").required("Ce champs est requis"),
    Email2 : yup.string().email("Email non valide"),
    Phone1: yup.string().matches(phoneRegExp, {message: 'Numéro de téléphone non valide', excludeEmptyString: true }).required('Ce champs est requis'),
    Phone2: yup.string().matches(phoneRegExp, {message: 'Numéro de téléphone non valide', excludeEmptyString: true }),
    FirstName1: yup.string().max(60, "Le nom est supérieure a 60 caractères").required('Ce champs est requis'),
    FirstName2: yup.string().max(60, "Le nom est supérieure a 60 caractères"),
    LastName1: yup.string().max(60, "Le nom est supérieure a 60 caractères").required('Ce champs est requis'),
    LastName2: yup.string().max(60, "Le nom est supérieure a 60 caractères"),
    Members: yup.array()
          .of(
            yup.object().shape({
                LastName: yup.string()
                  .required("Le nom est requis"),
                FirstName: yup.string()
                  .required("Le prénom est requis"),
                Phone: yup.string()
                  .matches(phoneRegExp, {message: 'Numéro de téléphone non valide', excludeEmptyString: true }),
                Address: yup.string().required("L'adresse est requise"),
                Birthday: yup.date().typeError("La date de naissance est requise").required().max(new Date(), "L'age minimum est de 6 ans !"),
                Email: yup.string().email('Email non valide'),
                Rank: yup.string().nullable().required("Le grade est requis")



            })
          )
          .min(1, "Vous devez renseigner au minimum un licencié")
          .required("Le champs membres est requis")
    
});

        
    const queryClient = useQueryClient();
    const { status, data, error, isFetching } = useRegister();
    const methods = useForm({
      defaultValues: {     

        Members: [preloade]
      },
      resolver: yupResolver(schema),
  });
    const { watch, errors } = methods;
    const navigate = useNavigate();


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



    if (status === 'loading') {
      return ('Loading...')
    }
    if (status === 'error') {
      if (error.response.status === 404) {
        return (
          <React.Fragment>
            <span>{error.response.data?.error}</span>
            <pre>{JSON.stringify(error.response, null, 4)}</pre>
          </React.Fragment>
        )
      }
      return (
        <React.Fragment>
          <span>{error.response.data?.error}</span>
          <pre>{JSON.stringify(error.response, null, 4)}</pre>
        </React.Fragment>
      )
    }
    if (status === 'success') {
      return (      
        <React.Fragment>
          <FormProvider {...methods} >
            <RegisterSteper Register={data} />
          </FormProvider>
        </React.Fragment>
      )
    }
    return (      
      <React.Fragment>
        <H1>Error générale</H1>
      </React.Fragment>
    )
}
