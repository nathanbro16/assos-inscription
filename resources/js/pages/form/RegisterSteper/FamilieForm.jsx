import * as React from 'react';

import { 
    Typography,
    Grid,
    TextField,
  
} from '@mui/material';

import { useFormContext } from "react-hook-form";

export default function FamilieForm({ formContent }) {
    const listmessage = {
        "Familie": "Merci de renseigner la ou les identités des responsables légaux. (1 personne minimum)",
        "OneUnder": "Merci de renseigner la ou les identités des responsables légaux. (1 personne minimum)",
        "OneAdult": "Merci de renseigner la ou les identités des personnes à contacter. (1 personne minimum)",
    }
    const methods = useFormContext();
    const { register, formState: { errors } } = methods;
  
    return (
      <React.Fragment>
        <Typography variant='body1' >{listmessage[formContent.one.TypeIns]}</Typography>
        <Typography variant="h6" gutterBottom>
            Premier contact
        </Typography>   
        <form>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    {...register("LastName1")}
                    variant="standard"
                    label="Nom"
                    error={Boolean(errors.LastName1)}
                    helperText={errors.LastName1?.message}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    {...register("FirstName1")}
                    label="Prénom"
                    variant="standard"
                    error={Boolean(errors.FirstName1)}
                    helperText={errors.FirstName1?.message}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    {...register("Phone1")}
                    label="Téléphone"
                    type='tel'
                    error={Boolean(errors.Phone1)}
                    helperText={errors.Phone1?.message}
                    fullWidth
                    variant='standard'
                />               
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    {...register("Email1")}
                    variant="standard"
                    label="Email"
                    error={Boolean(errors.Email1)}
                    helperText={errors.Email1?.message}
                    fullWidth
                />
            </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom>
            Second contact
        </Typography>      
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <TextField
                    {...register("LastName2")}
                    variant="standard"
                    label="Nom"
                    error={Boolean(errors.LastName2)}
                    helperText={errors.LastName2?.message}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    {...register("FirstName2")}
                    label="Prénom"
                    error={Boolean(errors.FirstName2)}
                    helperText={errors.FirstName2?.message}
                    fullWidth
                    variant="standard"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    {...register("Phone2")}
                    label="Téléphone"
                    error={Boolean(errors.Phone2)}
                    helperText={errors.Phone2?.message}
                    fullWidth
                    variant='standard'
                />               
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    {...register("Email2")}
                    variant="standard"
                    label="Email"
                    error={Boolean(errors.Email2)}
                    helperText={errors.Email2?.message}
                    fullWidth
                />
            </Grid>
        </Grid>
        </form>   

     
    </React.Fragment>        
    )
  }