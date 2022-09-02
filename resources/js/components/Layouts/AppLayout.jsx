import NavBar from '@/components/Layouts/Navigation'

import { useAuth } from '@/hooks/auth'
import MuiAppBar from '@mui/material/AppBar';

import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { Box, Button, Typography, LinearProgress } from '@mui/material';
import { Outlet } from 'react-router-dom';
import * as React from 'react';
import { useIsFetching } from '@tanstack/react-query';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const AppLayout = () => {
  
  const { user, logout } = useAuth({ middleware: 'auth' })
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [header, setHeader] = React.useState('');
  const isFetching = useIsFetching()

  return (
      <Box sx={{ display: 'flex' }}>

        <NavBar open={open} header={header} setOpen={setOpen} theme={theme} DrawerHeader={DrawerHeader} logout={logout}/>
        <Box component="main" sx={{ flexGrow: 1}}>          
          <DrawerHeader />
          {
              isFetching ? (
                <LinearProgress color="secondary" />
              ) : null
            }  
          <Box sx={{p: 3}}>
          <Outlet context={{setHeader}} />
          </Box>
    
        </Box>
    
      </Box>

  )
}

export default AppLayout
