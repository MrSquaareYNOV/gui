import { StationDTO } from '@gui-nx/types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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

type Props = {
  stations: StationDTO[];
  manage?: boolean;
  onEdit?: (station: StationDTO) => void;
  onDelete?: (station: StationDTO) => void;
};

export const StationList: FC<Props> = ({
  stations,
  manage,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>UUID</TableCell>
            <TableCell>Nom</TableCell>
            <TableCell>Localisation</TableCell>
            <TableCell>Vélos actuels</TableCell>
            <TableCell>Vélos total</TableCell>
            {manage ? <TableCell align={'right'}>Actions</TableCell> : null}
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
              {manage ? (
                <TableCell component="th" scope="row" align={'right'}>
                  <IconButton onClick={() => onEdit && onEdit(station)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete && onDelete(station)}>
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
