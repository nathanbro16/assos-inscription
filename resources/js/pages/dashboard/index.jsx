import AppLayout from '@/components/Layouts/AppLayout'
import { useOutletContext } from 'react-router-dom';
import useTitle from '@/components/Layouts/usetitle';
import { useEffect, useMemo, useState } from 'react';
import axios from '@/lib/axios';
import BasicTable from '@/components/Tables';
import { useForm, Controller } from 'react-hook-form';

import {useQuery, useQueryClient, useMutation} from 'react-query';
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
import Grid from '@mui/material/Grid'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'


const createPost = async (data) => {
  const { data: response } = await axios.post(
    '/api/registrations'
    , data
  );
  return response.data;
};

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
  
  useTitle('Tableau de Bord')

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      Titre: '',
      CheckList: '',
      DateOpen: '',
      DateClosed: '',
      IsOpen: false,

    }
  });

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

  const {mutate, isLoading } = useMutation(createPost, {
    onSuccess: data => {
      console.log(data);
      const message = "success"
      alert(message)
    },
    onError: () => {
      alert("there was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('create');
    }
  })

  const onSubmit = (data) => {
    const post = {
      ...data
    };
    mutate(post);
  }

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle >
            Ajouter
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Formualire pour les inscriptions
            </DialogContentText>
                  <Controller 
                    name="Titre"
                    control={control}
                    render={({field}) => <TextField 
                      {...field}
                      label="Titre"
                      variant="filled"

                    />}
                  />    
                  <Controller 
                    name="CheckList"
                    control={control}
                    render={({field}) => <TextField 
                      {...field}
                      label="Check-List"
                      variant="filled"

                      />}
                  />
                  <Controller 
                    name="DateOpen"
                    control={control}
                    render={({field}) => <DatePicker
                      {...field}
                      label="Date D'ouverture"
                      renderInput={(params) => 
                        <TextField variant="filled" {...params} />}
                    />}
                  />
                <Controller 
                  name="DateClosed"
                  control={control}
                  render={({field}) => <DatePicker
                    {...field}
                    label="Date de fermeture"
                    renderInput={(params) => 
                      <TextField variant="filled" {...params} />}
                  />}
                />
                <Controller 
                  name="IsOpen"
                  control={control}
                  render={({field}) => 
                    <FormControlLabel
                    label="Formulaire ouvert"
                    control={
                      <Checkbox
                        {...field}
                        color="primary"
                      />}
                    />}
                />




            </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              onClick={handleClose}
            >
              Annuler
            </Button>
            <Button
              color="primary"
              type='submit'
            >
              Valider
            </Button>
          </DialogActions>
        </form>
        </Dialog>
      </LocalizationProvider>
    </div>
  )
}

export default Dashboard
