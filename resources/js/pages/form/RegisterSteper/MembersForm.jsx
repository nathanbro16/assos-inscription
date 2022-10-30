import * as React from 'react';

import { 
    useFieldArray, 
    useFormContext, 
    Controller 
} from 'react-hook-form';


import { format } from "date-fns";
import fr from 'date-fns/locale/fr';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { 
    LocalizationProvider, 
    DatePicker, 
} from '@mui/x-date-pickers';

import { 
    Typography,
    TextField,
    MenuItem,
    Grid, 
    Button,
    Divider,
  
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';


function MembersForm({ formContent }) {

    const methods = useFormContext();
    const { register, trigger, control, formState: { errors } } = methods;
    const {     
        fields,
        append,
        remove,
        insert,
    } = useFieldArray({
        control,
        name: "Members"
    });

    const onSubmit = data => {
        toggleMembers(data);
        console.log(data);
        handleNext()
    };

    const preloade = { FirstName: "", LastName: "", Email: "", Phone: "", Address: "", Birthday: null, Rank: null }

    const currencies = [
        {
          value: 'USD',
          label: '$',
        },
        {
          value: 'EUR',
          label: '€',
        },
        {
          value: 'BTC',
          label: '฿',
        },
        {
          value: 'JPY',
          label: '¥',
        },
      ];

    
  return (
    <React.Fragment>
    <Typography variant="h6" gutterBottom>
        Judokas
    </Typography>   
    <Typography variant='body1'>Merci de renseigner ci-dessous les personnes qui seront licenciés.</Typography>
    <form >
        <Grid container spacing={2}  alignItems="center">
            {fields.map((item, index) => {
            return (
                <Grid key={item.id} item container justifyContent="center" alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={1} >
                        <Typography variant="subtitle2" align='center'  gutterBottom>
                            Judoka {index+1}
                        </Typography>
            
                    </Grid>

                    <Grid item container xs={12} sm={9} spacing={0.5}>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                required
                                variant="standard"
                                label="Nom"
                                {...register(`Members.${index}.LastName`)}
                                
                                error={Boolean(errors.Members?.[index]?.LastName?.message)}
                                helperText={errors.Members?.[index]?.LastName?.message}
                                fullWidth
                            />
                            
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                required
                                label="Prénom"
                                {...register(`Members.${index}.FirstName`)}
                                error={Boolean(errors.Members?.[index]?.FirstName?.message)}
                                helperText={errors.Members?.[index]?.FirstName?.message}
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="Téléphone"
                                {...register(`Members.${index}.Phone`)}
                                error={Boolean(errors.Members?.[index]?.Phone?.message)}
                                helperText={errors.Members?.[index]?.Phone?.message}
                                fullWidth
                                variant='standard'
                            />  
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                {...register(`Members.${index}.Rank`)}
                                select
                                fullWidth
                                required
                                defaultValue={""}
                                variant='standard'
                                label="Grade"
                                error={Boolean(errors.Members?.[index]?.Rank?.message)}
                                helperText={errors.Members?.[index]?.Rank?.message}
                                >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                label="Adresse"
                                {...register(`Members.${index}.Address`)}
                                error={Boolean(errors.Members?.[index]?.Address?.message)}
                                helperText={errors.Members?.[index]?.Address?.message}
                                fullWidth
                                variant='standard'
                            />               
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Controller 
                                mask="____/__/__"
                                name={`Members.${index}.Birthday`}
                                control={control}
                                defaultValue={null}
                                render={({ field, fieldState: { error } }) => (
                                    <LocalizationProvider adapterLocale={fr} dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            {...field}                 
                                            label="Date de naissance"
                                            openTo="year"
                                            views={['year', 'month', 'day']}
                                            maxDate={ new Date() }
                                            renderInput={(params) => 
                                            <TextField 
                                                {...params}
                                                error={Boolean(error?.message)}
                                                helperText={error?.message}
                                                required
                                                variant='standard'
                                                    />}
                                        />
                                    </LocalizationProvider>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="Email"
                                {...register(`Members.${index}.Email`)}
                                error={Boolean(errors.Members?.[index]?.Email?.message)}
                                helperText={errors.Members?.[index]?.Email?.message}
                                fullWidth
                                variant="standard"
                            />
                        </Grid>

                    </Grid>
                    <Grid item xs={12} sm={2} >
                        <Button variant="outlined" fullWidth size="medium" color="error" onClick={() => remove(index)}>
                            <DeleteIcon /> Supprimer
                        </Button>              
                    </Grid>
                    <Grid item xs={12}>
                        <Divider variant="middle" />
                    </Grid>

                </Grid>               
            );
            })}
            <Grid item xs >
                <Typography variant="body1" color="error">{errors.Members?.message}</Typography>
                <Button variant="outlined" fullWidth color="success" onClick={() => append(preloade)}>
                    <AddIcon /> Ajouté
                </Button>
            </Grid>
        </Grid>
    </form>
    </React.Fragment>

  )

}

export default React.memo(MembersForm);