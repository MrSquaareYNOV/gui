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

import { UserDTO } from '@gui-nx/types';

type Props = {
  users: UserDTO[];
  manage?: boolean;
  onEdit?: (user: UserDTO) => void;
  onDelete?: (user: UserDTO) => void;
};

export const UserList: FC<Props> = ({ users, manage, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>UUID</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Position</TableCell>
            {manage ? <TableCell align={'right'}>Actions</TableCell> : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {user.email}
              </TableCell>
              <TableCell component="th" scope="row">
                {user.rentalPosition || 'None'}
              </TableCell>
              {manage ? (
                <TableCell component="th" scope="row" align={'right'}>
                  <IconButton onClick={() => onEdit && onEdit(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete && onDelete(user)}>
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
