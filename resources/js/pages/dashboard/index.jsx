import AppLayout from '@/components/Layouts/AppLayout'
import { useOutletContext } from 'react-router-dom';
import * as React from 'react';
import useTitle from '@/components/Layouts/usetitle';

const RegisterLicense = () => {

  useTitle('Tableau de Bord')
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            Pas grand chose a dire
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterLicense