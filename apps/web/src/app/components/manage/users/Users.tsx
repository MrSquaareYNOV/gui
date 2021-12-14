import { Button } from '@mui/material';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { UserList } from '../../users/UserList';

import styles from './Users.module.scss';
import { UserRepository } from '../../../repositories/user';

export const ManageUsers: FC = () => {
  const usersRepository = new UserRepository();
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Gestion des utilisateurs</h1>
        <Button
          variant="contained"
          onClick={() => history.push('/manage/users/add')}
        >
          Ajouter
        </Button>
      </div>
      <UserList
        users={usersRepository.getUsers()}
        manage={true}
        onEdit={(user) => history.push(`/manage/users/edit/${user.id}`)}
      />
    </div>
  );
};
