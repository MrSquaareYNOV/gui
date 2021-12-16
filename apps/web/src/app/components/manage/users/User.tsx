import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { UserForm } from '../../users/UserForm';

import styles from './User.module.scss';
import { UserRepository } from '../../../repositories/user';

type Params = {
  id?: string;
};

export const ManageUser: FC = () => {
  const userRepository = new UserRepository();
  const { id } = useParams<Params>();

  const user = id ? userRepository.getUser(id) : undefined;

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>
          {user ? 'Éditer' : 'Ajouter'} un utilisateur
        </h1>
      </div>
      <UserForm user={user} />
    </div>
  );
};
