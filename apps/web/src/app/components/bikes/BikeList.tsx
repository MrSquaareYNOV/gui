import { BikeDTO } from '@gui-nx/types';
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
  bikes: BikeDTO[];
  manage?: boolean;
  onEdit?: (bike: BikeDTO) => void;
  onDelete?: (bike: BikeDTO) => void;
};

export const BikeList: FC<Props> = ({ bikes, manage, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nom</TableCell>
            {manage ? <TableCell align={'right'}>Actions</TableCell> : null}
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
              {manage ? (
                <TableCell component="th" scope="row" align={'right'}>
                  <IconButton onClick={() => onEdit && onEdit(bike)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete && onDelete(bike)}>
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
