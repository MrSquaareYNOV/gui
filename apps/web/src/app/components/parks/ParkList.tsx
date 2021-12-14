import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { FC } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { ParkDTO } from '@gui-nx/types';

type Props = {
  parks: ParkDTO[];
  manage?: boolean;
  onEdit?: (park: ParkDTO) => void;
  onDelete?: (park: ParkDTO) => void;
};

export const ParkList: FC<Props> = ({ parks, manage, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>UUID</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Localisation</TableCell>
            <TableCell>Stations</TableCell>
            {manage ? <TableCell align={'right'}>Actions</TableCell> : null}
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
              {manage ? (
                <TableCell component="th" scope="row" align={'right'}>
                  <IconButton onClick={() => onEdit && onEdit(park)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete && onDelete(park)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
