import AppLayout from '@/components/Layouts/AppLayout'
import useTitle from '@/components/Layouts/usetitle';
import { useEffect, useMemo, useState, useCallback } from 'react';
import axios from '@/lib/axios';
import {useRegisters} from '@/hooks/registering';
import BasicTable from '@/components/Tables';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {Link as RouterLink} from 'react-router-dom';

import {
  parseISO,
  format
} from "date-fns";
import { fr } from "date-fns/locale";

import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query';

import ModalInscript from '@/components/FormInscript'

import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


import {
  Button, 
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardHeader,
  Tooltip,
  Avatar,
  IconButton,
  Fab
} from '@mui/material'

import { green, red } from "@mui/material/colors";

import * as React from 'react';


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


function ListenForm({Id, Title, Online, DateClosed, Created}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const renderLink = React.useMemo(
    () =>
      React.forwardRef(function Link(itemProps, ref) {
        return <RouterLink to={"/dashboard/register/"+Id} ref={ref} {...itemProps} role={undefined} />;
      }),
    [Id],
  );


  const ColorIsOnline = (Online) => {
    let sx = {};
    if (Online) {
      sx = { bgcolor: green[100], color: green[600] };
    } else {
      sx = { bgcolor: red[100], color: red[600] };
    }
    return sx;
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (

    <React.Fragment>
      <Card>
        <CardHeader
          avatar={
            <Tooltip title={Online ? "Ouvert" : "Fermé"}>
              <Avatar sx={() => ColorIsOnline(Online)}>
                <FormatListBulletedIcon />
              </Avatar>
            </Tooltip>
          }
          action={
            <IconButton 
              onClick={handleOpenMenu} 
              aria-label="Option"
              aria-controls={open ? Title+"Menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              >
              <MoreVertIcon />
            </IconButton>
          }
          title={Title}
          subheader={"Crée le : "+format(parseISO(Created), "PPPP", { locale : fr })}
        />
      </Card>
      <Menu id={Title+"Menu"} anchorEl={anchorEl} keepMounted open={open} onClose={handleCloseMenu}>
        <MenuItem component={renderLink }>
          <ListItemIcon>
            <FormatListBulletedIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Consulter</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <EditIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Editer</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DeleteIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText>Supprimer</ListItemText>
        </MenuItem>
      </Menu>
    </React.Fragment>

  )
}


function Dashboard() {  
  
  useTitle('Gestion des inscriptions')

  
  const queryClient = useQueryClient()
  const { status, data, error, isFetching } = useRegisters();
  const [open, setOpen] = useState(false);
  

  const handleOpenNewForm = () => {
    setOpen(true);
  };

  const handleCloseNewForm = () => {
    setOpen(false);
  };

  
 
  return (
    <React.Fragment>
      {status === 'loading' ? (
        'Loading...'
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <React.Fragment>
          {data.success.map((value, key) => (
            <ListenForm key={key} Id={value.id} Title={value.Title} Online={value.IsOpen} DateClosed={value.DateClosed} Created={value.created_at} />
          ))}
          
        </React.Fragment>
    )}
      <Fab
        color="primary"
        aria-label="Ajouter"
        sx={fabStyle}
        onClick={handleOpenNewForm}
      >
        <AddIcon />
      </Fab>
      <ModalInscript open={open} handleClose={handleCloseNewForm} />

    </React.Fragment>
  )
}

export default Dashboard