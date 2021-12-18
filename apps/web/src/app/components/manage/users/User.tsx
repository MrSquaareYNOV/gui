import { UserRepository } from '@gui-nx/repositories';
import {Errors, UserDTO } from '@gui-nx/types';
import { Alert, AlertTitle, LinearProgress } from '@mui/material';
import { Formik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { UserForm } from '../../users/UserForm';
import styles from './User.module.scss';

type Params = {
  id?: string;
};

export const ManageUser: FC = () => {
  const userRepository = UserRepository.get();
  const { id } = useParams<Params>();
  const history = useHistory();

  const [user, setUser] = useState<UserDTO>();
  const [errors, setErrors] = useState<Errors>();

  const globalErrors = errors?.list.filter(
    (err) => !err.code.startsWith('INVALID_FIELD')
  );
  const fieldErrors = errors?.list.filter((err) =>
    err.code.startsWith('INVALID_FIELD')
  );
  const formErrors = {
    email:
      fieldErrors?.filter((error) => error.code === 'INVALID_FIELD_EMAIL') ||
      [],
    password:
      fieldErrors?.filter((error) => error.code === 'INVALID_FIELD_PASSWORD') ||
      [],
    rentalBikeId:
      fieldErrors?.filter(
        (error) => error.code === 'INVALID_FIELD_RENTALBIKEID'
      ) || [],
    rentalPosition:
      fieldErrors?.filter(
        (error) => error.code === 'INVALID_FIELD_RENTALPOSITION'
      ) || [],
    permission:
      fieldErrors?.filter(
        (error) => error.code === 'INVALID_FIELD_PERMISSION'
      ) || [],
  };

  const getUser = async (id: string) => {
    try {
      const user = await userRepository.getUser(id);

      setUser(user);
      setErrors(undefined);
    } catch (e) {
      if (e instanceof Errors) {
        setErrors(e);
      } else {
        console.error(e);
      }
    }
  };

  const createUser = async (user: Omit<UserDTO, 'id'>) => {
    try {
      await userRepository.createUser(user);

      setErrors(undefined);

      history.push('/manage/users');
    } catch (e) {
      if (e instanceof Errors) {
        setErrors(e);
      } else {
        console.error(e);
      }
    }
  };

  const editUser = async (id: string, user: Partial<Omit<UserDTO, 'id'>>) => {
    try {
      await userRepository.editUser(id, user);

      setErrors(undefined);

      history.push('/manage/users');
    } catch (e) {
      if (e instanceof Errors) {
        setErrors(e);
      } else {
        console.error(e);
      }
    }
  };

  const onSubmit = (values: any) => {
    if (id) {
      editUser(id, values);
    } else {
      createUser(values);
    }
  };

  useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, [id]);

  if (id && !user) {
    return (
      <div className={styles.container}>
        <LinearProgress />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>
          {user ? 'Éditer' : 'Ajouter'} un utilisateur
        </h1>
      </div>
      {globalErrors ? (
        <div className={styles.container}>
          {globalErrors.map((error, idx) => (
            <Alert key={idx} severity="error">
              <AlertTitle>{error.code}</AlertTitle>
              {error.message}
            </Alert>
          ))}
        </div>
      ) : null}
      <Formik
        initialValues={
          user || {
            id: '',
            email: '',
            password: '',
            rentalBikeId: '',
            rentalPosition: '',
            permission: 0,
          }
        }
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleSubmit }) => {
          return (
            <UserForm
              user={values}
              errors={formErrors}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          );
        }}
      </Formik>
    </div>
  );
};
