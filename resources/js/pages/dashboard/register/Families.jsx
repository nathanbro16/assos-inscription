import { useParams } from "react-router-dom";
import useTitle from '@/components/Layouts/usetitle';
import {useFamilies, mutateFamilies} from '@/hooks/registering';
import * as React from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import Tabled from "./table";


import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import DoneIcon from '@mui/icons-material/Done';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";




import { LinearProgress, Typography, Button } from "@mui/material";
import {
  parseISO,
  format,
  differenceInYears
} from "date-fns";
import { fr } from "date-fns/locale";
import { Query, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { useSnackbar } from 'notistack';



const Status = ({CheckList}) => {
  const [color, setcolor] = React.useState("primary");

  const OnArray = Object.values(CheckList) 
  
  const percentage = OnArray.filter(Boolean).length * 100 / OnArray.length;

  React.useEffect(() => {
    if (percentage <= 25) {
      setcolor('error')
    } else if (percentage <= 50) {
      setcolor('error')
    } else if (percentage <= 75) {
      setcolor('warning')
    } else {
      setcolor('success')
    }
    
  }, [percentage]);

  return (
    <LinearProgress sx={{height: 7}} color={color} value={percentage} variant="determinate" />
  )

}


function CheckItem({label, status, onClick}) {


  return (
    <Chip 
      label={label} 
      onClick={onClick} 
      onDelete={onClick} 
      deleteIcon={status ? <DoneIcon /> : <MoreHorizIcon/> } 
      color={status ? 'success' : 'warning'} 
    />
  )
}
function calculateAge(birth) {
  const date = parseISO(birth);
  const age = differenceInYears(new Date(), date);
  return age;
}

function Row(props) {
  const { row, handleUpdateFamilie } = props;
  const [open, setOpen] = React.useState(false);
  
  const handleUpdateItem = (id, Item, event) => {
    const object = row.CheckList

    const data = {
      CheckList: {}
    }

    Object.entries(object).map(
      ([name, value]) => {
        if (Item === name) {
          data['CheckList'][name] = !value
        } else {
          data['CheckList'][name] = value
        }
      }

    )
    handleUpdateFamilie({id, data})

  }


  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.last_name}
        </TableCell>
        <TableCell align="right"><Status CheckList={row.CheckList} /></TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">{row.phone_1}</TableCell>
        <TableCell align="right">{row.phone_1}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Check-List
              </Typography>
              <Stack
                sx={{ my: 2 }}
                spacing={1}   
                direction="row"
                justifyContent="space-around"
                alignItems="center" >
                  {
                    Object.entries(row.CheckList).map(
                      ([name, value]) => (<CheckItem key={name} label={name} status={value} onClick={ (event) => handleUpdateItem(row.id, name, event)} />)
                    )
                  }
              </Stack>
              <Divider/>
              <Typography variant="h6" gutterBottom component="div">
                Judokas
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Nom</TableCell>
                    <TableCell>Prénom</TableCell>
                    <TableCell>Date de naissance</TableCell>
                    <TableCell align="right">email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.Members.map((Member) => (
                    <TableRow key={Member.id}>
                      <TableCell component="th" scope="row">
                        {Member.first_name}
                      </TableCell>
                      <TableCell>{Member.last_name}</TableCell>
                      <TableCell>{ 
                        format(parseISO(Member.birth), "PPPP", { locale : fr }) + 
                        " / " + calculateAge(Member.birth) + " ans" }</TableCell>
                      <TableCell align="right">
                        {Member.email}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const FamiliesList = () => {

    useTitle('Gestion des incriptions');
    let { RegisterId } = useParams();
    
    const { status, data, error, isFetching, mutateUpdateFamilie } = useFamilies(RegisterId);

    const handleUpdateFamilie = ({id, data}) => {
      
      mutateUpdateFamilie({id, data})
  
    }

   

    return (
      <React.Fragment>
      {status === 'loading' ? (
        'Loading...'
      ) : status === 'error' ? (
        <span> { error.response.data.error } </span>
      ) : (
        <React.Fragment>
          <Typography sx={{ my: 2 }} variant="h4">
            Liste des adhérents / Regroupement par families
          </Typography>
          <Button variant="outlined" color="primary">
            Ouvrir tout le monde
          </Button>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Dessert (100g serving)</TableCell>
                  <TableCell align="right">Calories</TableCell>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.success.map((row) => (
                  <Row key={row.id} row={row} handleUpdateFamilie={handleUpdateFamilie.bind(this)} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <ReactQueryDevtools initialIsOpen={true} />
          
        </React.Fragment>
    )}

    </React.Fragment>
    )
}
/**
 *                     <TableCell component="th" scope="row">
                      {family.last_name}
                    </TableCell>
                    <TableCell align="right"><Status /></TableCell>
                    <TableCell align="right">{family.email}</TableCell>
                    <TableCell align="right">{Object.keys(family.Members).length}</TableCell>
                    <TableCell align="right">{ format(parseISO(family.updated_at), "PPPP", { locale : fr }) }</TableCell>
                  </TableRow>
 */
export default FamiliesList