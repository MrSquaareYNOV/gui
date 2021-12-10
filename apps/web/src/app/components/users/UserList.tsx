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

import { UserDTO } from '../../types/user';

type Props = {
  users: UserDTO[];
};

export const UserList: FC<Props> = ({ users }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>UUID</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Position</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
