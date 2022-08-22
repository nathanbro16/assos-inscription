import '#css/App.css';
import { Routes, Route, useParams } from 'react-router-dom';
import Login from '@/pages/login';
import Register from '@/pages/register';
import Home from '@/pages/home';
import ForgotPassword from '@/pages/forgot-password';
import PasswordReset from '@/pages/password-reset';
import NotFoundPage from '@/pages/404';

import AppLayout from '@/components/Layouts/AppLayout';

import Dashboard from '@/pages/dashboard/index';
import RegisterLicense from '@/pages/dashboard/register/index';
import FamiliesList from '@/pages/dashboard/register/Families';

import Inscriptions from '@/pages/form/inscriptions';
import ListForm from '@/pages/form/index';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="antialiased">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset/:token" element={<PasswordReset />} />
        <Route path='/dashboard' element={<AppLayout/>} >
          <Route index element={<Dashboard />} />
          <Route path='register'>
            <Route index element={<RegisterLicense />} />
            <Route path=':RegisterId' element={<FamiliesList/>}  />
            <Route path='edit/:RegisterId' element={<FamiliesList/>}  />
          </Route>
        </Route>
        <Route path='/form'>
          <Route index element={ <ListForm/> } />
          <Route path='inscr/:form' element={<Inscriptions />}/>
        </Route>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </div>
    </QueryClientProvider>
  );
}

export default App;
