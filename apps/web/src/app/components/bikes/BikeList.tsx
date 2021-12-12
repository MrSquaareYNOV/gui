import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { FC } from 'react';

import { BikeDTO } from '../../types/bike';

type Props = {
  bikes: BikeDTO[];
};

export const BikeList: FC<Props> = ({ bikes }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> <strong>ID</strong></TableCell>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Mise en service</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bikes.map((bike) => (
            <TableRow key={bike.id}>
              <TableCell component="th" scope="row">
                {bike.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {bike.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {bike.MES}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
};
