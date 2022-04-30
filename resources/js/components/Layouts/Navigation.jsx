import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';

import ListItem from '@mui/material/ListItem';
import {
  ListItemText, 
  ListItemIcon, 
  ListItemButton,
  List,
  Tooltip, 
  Menu,
  Toolbar,
  MenuItem,
  IconButton,
  Divider,
  Typography,
  CssBaseline,
  Box
} from '@mui/material';

import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';

import { Link as RouterLink, Route, MemoryRouter } from 'react-router-dom';

const links = [
  { to: '/dashboard', text: 'Dashboard', icon: <DashboardRoundedIcon />},
  { to: '/dashboard/register', text: 'Inscription', icon: <AppRegistrationRoundedIcon />}
]

const drawerWidth = 240;

function ListItemLink(props) {
  const { icon, primary, to, open } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef(function Link(itemProps, ref) {
        return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
      }),
    [to],
  );

  return (
    <li>
      <Tooltip title={primary} placement="right">
        <ListItemButton 
        component={renderLink }
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5
        }}
        >
          {icon ? 
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center'
            }}
          >
            {icon}
          </ListItemIcon> 
          : null}
          <ListItemText primary={primary} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>   
      </Tooltip>
    </li>
  );
}

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  }),
);

function NavBar({ open, header, setOpen, theme, DrawerHeader, logout }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {header}
          </Typography>
          <div>
            <IconButton 
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <LogoutRoundedIcon />
                </ListItemIcon>
                <ListItemText>Déconnection</ListItemText>
                
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        {links.map((text, index) => (
            <ListItemLink key={index} to={text.to} primary={text.text} icon={text.icon} open={open} />
        ))}
        </List>
      </Drawer>
    </Box>
  );
}

export default NavBar