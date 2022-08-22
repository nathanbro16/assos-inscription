import {useRegisters} from '@/hooks/registering';
import React, { Children } from 'react';
import { useQueryClient } from 'react-query';
import {useNavigate} from 'react-router-dom';

import {
    parseISO,
    formatDistance
} from "date-fns";
import { fr } from "date-fns/locale";

import { 
    Container,
    Grid,
    Typography,
    Button
} from '@mui/material';

import Card from '@/components/Card'


export default function ListForm() {

    let navigate = useNavigate();
    
    const queryClient = useQueryClient();
    const { status, data, error, isFetching } = useRegisters();

    return (
    <React.Fragment>
        {status === 'loading' ? (
          'Loading...'
        ) : status === 'error' ? (
          <span>Error: {error.message}</span>
        ) : (      
        <React.Fragment>
            <Container maxWidth="lg">
                <Grid container rowSpacing={4.5} columnSpacing={2.75} justifyContent="center" alignItems="center">

                    <Grid item xs={12} sx={{ mb: -2.25 }}>
                        <Typography  variant="h5">Liste des formulaires</Typography>
                    </Grid>
                    
                    {data.success.map((form, n) => {
                        return (
                            <Grid key={n} item xs={12} sm={8}>
                                <Card 
                                
                                Title={form.Title}
                                Subtitle={"Cloture " + formatDistance(
                                    parseISO(form.DateClosed),
                                    parseISO(form.DateOpen),
                                    { locale: fr, addSuffix: true }
                                  ) }
                                Description={"description" }
                                Actions={(
                                    <Button size="small" onClick={() => navigate('../inscr/'+form.id)}>S'incrire</Button>
                                )} />
                            </Grid>  
                        )
                    })}
                        
                             
                </Grid>
            </Container>
        </React.Fragment>
        )}
    </React.Fragment>)
}
