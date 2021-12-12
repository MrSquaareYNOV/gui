import { Button } from '@mui/material';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { UserList } from '../../users/UserList';
import { BikeDTO } from '../../../types/bike';

import styles from './Users.module.scss';
import { UserRepository } from '../../../repositories/user';

export const ManageUsers: FC = () => {
  const usersRepository = new UserRepository();
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Gestion des utilisateurs</h1>
      </div>
      <UserList users={usersRepository.users} />
    </div>
  );
};
