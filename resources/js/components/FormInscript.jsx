import BasicTable from '@/components/Tables';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import axios from '@/lib/axios';


import { format } from "date-fns";
import fr from 'date-fns/locale/fr';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { 
    LocalizationProvider, 
    DatePicker, 
} from '@mui/x-date-pickers';

import { 
    Box, 
    FormControl, 
    FormLabel, 
    FormHelperText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Checkbox,
    Button,
    TextField,
    FormControlLabel,
    Stack
} from '@mui/material';
import { 
    useQuery,  
    useQueryClient,  
    useMutation
} from '@tanstack/react-query';
import CreatableSelect from 'react-select/creatable';



const createPost = async (data) => {
    const { data: response } = await axios.post(
      '/api/registrations'
      , data
    );
    return response.data;
  };
  const schema = yup.object({
    Titre: yup.string().required("Un Titre est requis"),
    IsSuccess: yup.string().required("Un message de fin est requis"),
    CheckList: yup.object().nullable(),
    DateOpen: yup.date().typeError("la date d'ouverture est requise").required().min(new Date(), "Cette date ne peux être inférieure a aujourd'huit"),
    DateClosed: yup.date().typeError("la date d'ouverture est requise").required().min(new Date(), "Cette date ne peux être inférieure a aujourd'huit"),
    //yup.date().when( 'DateOpen', (DateOpen, schema) => (DateOpen && schema.min(DateOpen, 'Cette date ne peux être inférieure à la date précédente'))),
    IsOpen: yup.boolean(),
  }).required();

function ModalInscript({open, handleClose}) {
    
    const { handleSubmit, control, register, reset, setError, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const {mutate, isLoading } = useMutation(createPost, {
        onSuccess: data => {
          console.log(data);
          const message = "success"
          alert(message)
        },
        onError: (error) => {
          //setError( "CheckList", {type: 'custom', message: 'ce n est pas bon !'})
          //console.log(error.response.data.errors);
          error.response.data.errors.map((error, champ) => setError(champ, {type: 'custom', message: error}))
          error.response.data.errors.map((error, champ) => console.log(error))
        },
        onSettled: () => {
          queryClient.invalidateQueries('create');
        }
      })
    const onSubmit = (data) => {
        const post = {
            Titre: data.Titre,
            IsSuccess: data.IsSuccess,
            CheckList: data.CheckList,
            DateOpen: format(data.DateOpen, "yyyy-MM-dd"),
            DateClosed: format(data.DateClosed, "yyyy-MM-dd"),
            IsOpen: data.IsOpen,
        };
    
    mutate(post);
    }
    return (
        <LocalizationProvider adapterLocale={fr} dateAdapter={AdapterDateFns}>
            <Dialog open={open} onClose={handleClose} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle >
                    Ajouter
                    </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Formualire pour les inscriptions
                    </DialogContentText>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>

                        <TextField
                            label="Titre"
                            name='Titre'
                            fullWidth
                            variant='filled'
                            sx={{ m: 1 }}
                            {...register("Titre")}
                            error={Boolean(errors.Titre)}
                            helperText={errors.Titre?.message}
                        />

                        <TextField
                            label="Message de fin"
                            name='IsSuccess'
                            variant='filled'
                            sx={{ m: 1, width: '29ch' }}
                            {...register("IsSuccess")}
                            error={Boolean(errors.IsSuccess)}
                            helperText={errors.IsSuccess?.message}
                        />
                        <CreatableSelect isMulti />

                        <TextField
                            label="Check-List"
                            name='CheckList'
                            variant='filled'
                            sx={{ m: 1, width: '29ch' }}
                            {...register("CheckList")}
                            error={Boolean(errors.CheckList)}
                            helperText={errors.CheckList?.message}
                        />

                        <FormControl sx={{ m: 1, width: '29ch' }}>
                            <Controller 
                                name="DateOpen"
                                control={control}
                                defaultValue={null}
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}                 
                                        label="Date D'ouverture"
                                        minDate={ new Date() }
                                        renderInput={(params) => 
                                        <TextField variant="filled" {...params} error={Boolean(errors.DateOpen)} helperText={errors.DateOpen?.message} />}
                                    />
                                )}
                            />
                        </FormControl>

                        <FormControl sx={{ m: 1, width: '29ch' }}>
                            <Controller 
                                name="DateClosed"
                                control={control}
                                defaultValue={null}
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}                 
                                        label="Date de fermeture"
                                        minDate={ new Date() }
                                        renderInput={(params) => 
                                        <TextField variant="filled" {...params} error={Boolean(errors.DateClosed)} helperText={errors.DateClosed?.message} />}
                                    />
                                )}
                            />
                        </FormControl>

                        <FormControlLabel
                            name='IsOpen'
                            label="Formulaire ouvert"
                            {...register("IsOpen")}
                            sx={{ m: 1, width: '25ch' }}
                            control={
                                <Checkbox
                                color="primary"
                                />}
                        />
                    </Box>        
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
    )

}

export default ModalInscript