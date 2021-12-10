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

import { StationDTO } from '../../types/station';

type Props = {
  stations: StationDTO[];
};

export const StationList: FC<Props> = ({ stations }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>UUID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Current bikes</TableCell>
            <TableCell>Total bikes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stations.map((station) => (
            <TableRow key={station.id}>
              <TableCell component="th" scope="row">
                {station.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {station.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {station.location}
              </TableCell>
              <TableCell component="th" scope="row">
                {station.currentBikesIds.length}
              </TableCell>
              <TableCell component="th" scope="row">
                {station.totalBikes}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
