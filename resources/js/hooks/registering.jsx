import useSWR from 'swr'
import axios from '@/lib/axios'

import { 
    useQuery,  
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import {useNavigate, useParams} from 'react-router-dom';

import { useSnackbar } from 'notistack';

const getRegister = async (form) => {

  const { data } = await axios.get(
      '/api/registrations/' + form
  );
  return data;
};

function useRegister() {

let { form } = useParams();

return useQuery(["Register"], () => getRegister(form), {
  retry: false,
  refetchOnReconnect: false, 
  refetchOnWindowFocus: false 
})
}

const getRegisters = async () => {

  const { data } = await axios.get(
      '/api/registrations'
  );
  return data;
};

function useRegisters() {

let { form } = useParams();

return useQuery(["Registers"], () => getRegisters(form), {
  refetchOnReconnect: false, 
  refetchOnWindowFocus: false 
})
}

const getFamilies = async (id) => {

  const { data } = await axios.get(
      '/api/Registr/'+id+'/Families',
      {
        validateStatus: function (status) {
          return status === 200;
        },        
      }
  );
  return data;
}; 

const updateFamilies = async (id, newdata) => {
  const { data } = await axios.put(
    `/api/Familie/${id}`, { ...newdata })
  return data;
}; 
const AddFamilies = async (data) => {
  const { returndata } = await axios.post(
    `/api/Familie/`, { ...data })
  return returndata;
}; 

function useFamilies(id) {

  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient()

  const {status, data, error, isFetching} = useQuery(["Families"], () => getFamilies(id),
  {
    retry: false, 
  })

  const { mutate: mutateUpdateFamilie } = useMutation(
    ({id, data}) => updateFamilies(id, data),
    {

      onSuccess: async (familie) => {

        queryClient.setQueryData(['Families'], (families) => {
          const data = {
            success: []
          }

          data.success = families.success.map(f => f.id === familie.success.id ? familie.success : f )
          enqueueSnackbar('Mise a jour réussie !', { variant: 'success' });

          return data
          
        })
      },
    })
  const { mutate: mutateAddFamilie } = useMutation(
      ({data}) => AddFamilies(data),
      {
  
        onSuccess: async (familie) => {
  
          queryClient.setQueryData(['Families'], (families) => {
            const data = {
              success: []
            }
  
            enqueueSnackbar('Mise a jour réussie !', { variant: 'success' });
  
            return families
            
          })
        },
      }
    
  )

  return { status, data, error, isFetching, mutateUpdateFamilie, mutateAddFamilie}
}


export {useRegister, useRegisters, useFamilies}

