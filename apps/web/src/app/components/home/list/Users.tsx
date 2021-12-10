import { Button } from '@mui/material';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { UserList } from '../../users/UserList';
import { UserDTO } from '../../../types/user';

import styles from './Users.module.scss';
import { UserRepository } from '../../../repositories/user';

export const Users: FC = () => {
  const userRepository = new UserRepository();
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Liste des utilisateurs</h1>
        <Button
          variant="contained"
          onClick={() => history.push('/manage/users')}
        >
          Gérer
        </Button>
      </div>
      <UserList users={userRepository.users} />
    </div>
  );
};
