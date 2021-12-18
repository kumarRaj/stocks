import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

// function createData(profitMargin, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  
// ];


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function ProfitTable({data}) {
  const classes = useStyles();
  let stockData = data

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
                <StyledTableCell align="center">Name</StyledTableCell>
            {stockData.OPM.data.map((elem) => (
                <StyledTableCell align="center">{elem.year}</StyledTableCell>
            ))}
            <StyledTableCell align="center">TTM</StyledTableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
        <StyledTableRow key="xyz">
              <TableCell align="center" component="th" scope="row">
                OPM({stockData.OPM.unit})
              </TableCell>
              {
                  stockData.OPM.data.map((elem) => (
                    <TableCell align="center">{elem.value}</TableCell>
                  ))
              }
              <TableCell align="center">{stockData.OPM.TTM}</TableCell>
            </StyledTableRow>
            <StyledTableRow key="xyz">
              <TableCell align="center" component="th" scope="row">
                NPM({stockData.NPM.unit})
              </TableCell>
              {
                  stockData.NPM.data.map((elem) => (
                    <TableCell align="center">{elem.value}</TableCell>
                  ))
              }
              <TableCell align="center">{stockData.NPM.TTM}</TableCell>
            </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
