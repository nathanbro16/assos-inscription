import '#/App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/dashboard/index';
import Login from '@/pages/login';
import Register from '@/pages/register';
import Home from '@/pages/home';
import ForgotPassword from '@/pages/forgot-password';
import PasswordReset from '@/pages/password-reset';
import NotFoundPage from '@/pages/404';
import RegisterLicense from '@/pages/dashboard/register';
import AppLayout from '@/components/Layouts/AppLayout';
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
          <Route path="register" element={<RegisterLicense />} />

        </Route>
        <Route path="*" element={<NotFoundPage/>}
        />
      </Routes>
    </div>
    </QueryClientProvider>
  );
}

export default App;
