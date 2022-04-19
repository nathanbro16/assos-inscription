import AppLayout from '@/components/Layouts/AppLayout'
import { useOutletContext } from 'react-router-dom';
import useTitle from '@/components/Layouts/usetitle';
import { useEffect, useMemo, useState } from 'react';
import axios from '@/lib/axios';
import BasicTable from '@/components/Tables';

import {useQuery, useQueryClient} from 'react-query';

const getPosts = async () => {
  const { data } = await axios.get(
    '/api/registrations'
  );
  return data;
};

function usePosts() {
  return useQuery('posts', getPosts);
}

function Dashboard() {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = usePosts();
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
    <BasicTable columns={columns} data={data.success} />
    )}
    </div>
  )
}

export default Dashboard
