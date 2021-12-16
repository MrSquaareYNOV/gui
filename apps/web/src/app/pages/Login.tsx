import { AuthRepository } from '@gui-nx/repositories';
import { Errors, UserDTO } from '@gui-nx/types';
import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Logo from '../../assets/Logo.svg';
import styles from './Login.module.scss';

export const Login: FC = () => {
  const authRepository = AuthRepository.get();
  const history = useHistory();

  const [errors, setErrors] = useState<Errors>();

  const login = async (
    userCredentials: Pick<UserDTO, 'email' | 'password'>
  ) => {
    try {
      const token = await authRepository.loginAdmin(userCredentials);

      localStorage.setItem('token', token);
      setErrors(undefined);

      history.push('/');
    } catch (e) {
      if (e instanceof Errors) {
        setErrors(e);
      } else {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push('/');
    }
  }, [history]);

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src={Logo} alt="Logo" />
        <h1 className={styles.logoTexte}>GUICYCLE</h1>
      </div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => login(values)}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form className={styles.boxContainer} onSubmit={handleSubmit}>
            <div className={styles.fieldContainer}>
              <TextField
                id="email"
                label="E-mail"
                variant="standard"
                font-color="white"
                sx={{
                  input: {
                    color: '#fff',
                  },
                }}
                value={values.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.fieldContainer}>
              <TextField
                id="password"
                label="Password"
                variant="standard"
                type="password"
                sx={{
                  input: {
                    color: '#fff',
                  },
                }}
                value={values.password}
                onChange={handleChange}
              />
            </div>
            <div className={styles.buttonContainer}>
              <Button variant="contained" type="submit" sx={{ width: '100%' }}>
                Login
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
