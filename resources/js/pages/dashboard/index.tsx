import AppLayout from '@/components/Layouts/AppLayout'
import { useOutletContext } from 'react-router-dom';
import useTitle from '@/components/Layouts/usetitle';
import { useEffect, useMemo, useState } from 'react';
import axios from '@/lib/axios';
import BasicTable from '@/components/Tables';
import { useForm } from 'react-hook-form';

import {useQuery, useQueryClient} from 'react-query';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



const getPosts = async () => {
  const { data } = await axios.get(
    '/api/registrations'
  );
  return data;
};

function usePosts() {
  return useQuery('posts', getPosts);

}

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

function Dashboard() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = usePosts();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log('render');

const columns = useMemo(
  () => [
    {
      Header: 'inscriptions',
      columns: [
        {
          Header: 'Titre',
          accessor: 'Title'
        },
        {
          Header: 'Message de réussite',
          accessor: 'IsSuccess'
        }
      ]
    }
  ],
  []
)

  useTitle('Tableau de Bord')
 
  return (<div>
    {status === 'loading' ? (
      'Loading...'
    ) : status === 'error' ? (
      <span>Error: {error.message}</span>
    ) : (
      <div>
        <BasicTable columns={columns} data={data.success} />

      </div>
    )}  <Fab
          color="primary"
          aria-label="Ajouter"
          sx={fabStyle}
          onClick={handleClickOpen}
        >
          <AddIcon />
        </Fab>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Dialog open={open} onClose={handleClose} >
          <DialogTitle >
            Ajouter
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Formualire pour les inscriptions
            </DialogContentText>
            <Stack spacing={3}>
              <TextField
                id=""
                label="Titre"              
              />
              <DatePicker
                label="Date d'ouverture"
                openTo="day"
                views={['year', 'month', 'day']}
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                label="Date de fermeture"
                openTo="day"
                views={['year', 'month', 'day']}
                renderInput={(params) => <TextField {...params} />}
              />
              <TextField
                id=""
                label="check list"
               
              />
              
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              onClick={handleClose}
            >
              Annuler
            </Button>
          </DialogActions>
          
        </Dialog>
      </LocalizationProvider>
    </div>
  )
}

export default Dashboard
