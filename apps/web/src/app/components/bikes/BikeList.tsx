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
            <TableCell>UUID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bikes.map((bike) => (
            <TableRow key={bike.id}>
              <TableCell component="th" scope="row">
                {bike.id}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
