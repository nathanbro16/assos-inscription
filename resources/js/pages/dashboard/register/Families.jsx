import { useParams } from "react-router-dom";
import useTitle from '@/components/Layouts/usetitle';
import {useFamilies} from '@/hooks/registering';
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


import { LinearProgress, Typography } from "@mui/material";
import {
  parseISO,
  format
} from "date-fns";
import { fr } from "date-fns/locale";


const Status = () => {

  return (
    <LinearProgress value={50} variant="determinate" />
  )

}

const FamiliesList = () => {

    useTitle('Gestion des incriptions');
    let { RegisterId } = useParams();

    const { status, data, error, isFetching } = useFamilies(RegisterId);
    return (
      <React.Fragment>
      {status === 'loading' ? (
        'Loading...'
      ) : status === 'error' ? (
        <span> { error.response.data.error } </span>
      ) : (
        <React.Fragment>
          <List>
                {data.success.map((family, key) => (
                  <React.Fragment key={key}>
                    <ListItem
                      alignItems="center"
                    >
                      <ListItemText primary={family.last_name} />
                      <Status/>
                      <Typography align="center">
                        {Object.keys(family.Members).length}
                      </Typography>
                      
                      { format(parseISO(family.updated_at), "PPPP", { locale : fr }) }
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}      
          </List>   
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