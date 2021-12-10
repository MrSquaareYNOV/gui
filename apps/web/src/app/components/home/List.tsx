import { Button } from '@mui/material';
import { FC } from 'react';

import styles from './List.module.scss';

export const List: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Button variant="contained" sx={{ width: '100%' }}>
          Liste des vélos
        </Button>
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="contained" sx={{ width: '100%' }}>
          Liste des stations
        </Button>
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="contained" sx={{ width: '100%' }}>
          Liste des parcs
        </Button>
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="contained" sx={{ width: '100%' }}>
          Liste des utilisateurs
        </Button>
      </div>
    </div>
  );
};
