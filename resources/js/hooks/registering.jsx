import useSWR from 'swr'
import axios from '@/lib/axios'

import { 
    useQuery,  
    useQueryClient,  
    useMutation
} from 'react-query';
import {useNavigate, useParams} from 'react-router-dom';


const getRegister = async (form) => {

  const { data } = await axios.get(
      '/api/registrations/' + form
  );
  return data;
};

function useRegister() {

let { form } = useParams();

return useQuery("Register", () => getRegister(form), {
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

return useQuery("Registers", () => getRegisters(form), {
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

function useFamilies(id) {
  return useQuery(["Families", 200], () => getFamilies(id),
  {
    retry: false, 
  })
}


export {useRegister, useRegisters, useFamilies}

