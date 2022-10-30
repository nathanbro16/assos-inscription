import * as React from 'react';

import { 
    Switch,
    Typography,
    Grid,
    TextField,
  
} from '@mui/material';

import { useFormContext } from "react-hook-form";


export default function ResumForm({ formContent }) {

    const methods = useFormContext();
    const { watch } = methods;
    const form = watch();

    return (
    <React.Fragment>
        <Typography variant="h6" gutterBottom>
            Résumer
        </Typography>
        <Typography variant="subtitle1">
            Merci de bien vouloir vérifier les informations si dessous avant la transmission des données.
        </Typography>
        <pre>{JSON.stringify(form, null, 4)}</pre>

     
    </React.Fragment>        
    )
  }