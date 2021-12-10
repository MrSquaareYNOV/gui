import { Button } from '@mui/material';
import { FC } from 'react';

import styles from './Manage.module.scss';

export const Manage: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Button variant="contained" sx={{ width: '100%' }}>
          Gérer des vélos
        </Button>
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="contained" sx={{ width: '100%' }}>
          Gérer des stations
        </Button>
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="contained" sx={{ width: '100%' }}>
          Gérer des parcs
        </Button>
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="contained" sx={{ width: '100%' }}>
          Gérer des utilisateurs
        </Button>
      </div>
    </div>
  );
};
