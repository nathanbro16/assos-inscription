import * as React from 'react';

import { 
    Typography, 
    FormControl, 
    FormLabel,
    FormHelperText, 
    FormControlLabel, 
    RadioGroup, 
    Radio, 
  
} from '@mui/material';

import { useFormContext, Controller } from 'react-hook-form';


export default function FamilieForm({ formContent }) {

    const methods = useFormContext();
    const { control, formState: { errors } } = methods;
  
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Introduction
            </Typography>   
            <Typography variant='body1'>
                Pour mieux vous guider par la suite, merci de répondre a cette question: 
            </Typography>
            <form>
            <FormControl error={Boolean(errors.TypeIns)} >
                <FormLabel>Cette inscription concerne:</FormLabel>
                <Controller
                    rules={{ required: "Merci de sélectioner une case" }}
                    control={control}
                    name="TypeIns"
                    defaultValue={null}
                    render={({ field }) => (
                    <RadioGroup {...field}>

                        <FormControlLabel 
                            value="Familie" 
                            control={<Radio />} 
                            label="Une Famille de plusieurs Judokas"
                        />
                        <FormControlLabel 
                            value="OneUnder" 
                            control={<Radio />} 
                            label="Un Judoka(te) mineur (-18ans)"
                        />
                        <FormControlLabel 
                            value="OneAdult" 
                            control={<Radio />} 
                            label="Un Judoka(te) majeur (+18ans)"
                        />
                        
                    </RadioGroup>
                    )}
                />
                <FormHelperText>{errors.TypeIns?.message}</FormHelperText>
            </FormControl>
            </form>
            
        </React.Fragment>        
    )
  }