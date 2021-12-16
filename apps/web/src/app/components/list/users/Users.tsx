import { Alert, AlertTitle, Button, LinearProgress } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { UserList } from '../../users/UserList';

import styles from './Users.module.scss';
import { UserRepository } from '@gui-nx/repositories';
import { Errors, UserDTO } from '@gui-nx/types';

export const Users: FC = () => {
  const userRepository = UserRepository.get();
  const history = useHistory();

  const [users, setUsers] = useState<UserDTO[]>();
  const [errors, setErrors] = useState<Errors>();

  const getUsers = async () => {
    try {
      const users = await userRepository.getUsers();

      setUsers(users);
      setErrors(undefined);
    } catch (e) {
      if (e instanceof Errors) {
        setErrors(e);
      } else {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (errors) {
    return (
      <div className={styles.container}>
        {errors.list.map((error, idx) => (
          <Alert key={idx} severity="error">
            <AlertTitle>{error.code}</AlertTitle>
            {error.message}
          </Alert>
        ))}
      </div>
    );
  }

  if (!users) {
    return (
      <div className={styles.container}>
        <LinearProgress />
      </div>
    );
  }

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
      <UserList users={users} />
    </div>
  );
};
