import { Box, Button, TextField } from '@mui/material';
import React, { FC } from 'react';

import styles from './Login.module.scss';

export const Login: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.boxContainer}>
        <div className={styles.fieldContainer}>
          <TextField
            id="username"
            label="Username"
            variant="standard"
            sx={{
              input: {
                color: '#fff',
              },
            }}
          />
        </div>
        <div className={styles.fieldContainer}>
          <TextField
            id="password"
            label="Password"
            variant="standard"
            sx={{
              input: {
                color: '#fff',
              },
            }}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button variant="contained" sx={{ width: '100%' }}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};
