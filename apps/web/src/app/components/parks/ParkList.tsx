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

import { ParkDTO } from '../../types/park';

type Props = {
  parks: ParkDTO[];
};

export const ParkList: FC<Props> = ({ parks }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>UUID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Stations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {parks.map((park) => (
            <TableRow key={park.id}>
              <TableCell component="th" scope="row">
                {park.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {park.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {park.location}
              </TableCell>
              <TableCell component="th" scope="row">
                {park.stationsIds.length}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
