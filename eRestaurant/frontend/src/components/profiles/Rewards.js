
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Cookies from 'js-cookie';
import Container from '@material-ui/core/Container';


export default class Rewards extends React.Component {
    constructor(props){
      super();
      this.state = {
      }

    }
    

    render(){
        return (
        <Container>
        <TableContainer >
                        <Table aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="center">Reward Code</TableCell>
                                <TableCell align="center">Reward Discount Amount</TableCell>
                                <TableCell align="center">Resturant</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            <TableRow>
                                <TableCell align="center">SAVE20</TableCell>
                                <TableCell align="center">20%</TableCell>
                                <TableCell align="center">test1</TableCell>
                            </TableRow>
                            </TableBody>
                        </Table>
        </TableContainer>
        </Container>
        )
    }
}

