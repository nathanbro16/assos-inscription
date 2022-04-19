import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useTable } from 'react-table';

export default function BasicTable({ columns, data }) {
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data
    })
  return (
    <TableContainer component={Paper}>
      <Table {...getTableProps()} sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                <TableCell {...column.getHeaderProps()}>
                    {column.render('Header')}
                </TableCell>
                ))}
            </TableRow>
            ))}
        </TableHead>
        <TableBody>
            {rows.map((row, i) => {
                prepareRow(row)
                return (
                    <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell, n) => {
                        return (
                        <TableCell {...cell.getCellProps()}>
                            {cell.render('Cell')}
                        </TableCell>
                        )
                    })}
                    </TableRow>
                )
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}