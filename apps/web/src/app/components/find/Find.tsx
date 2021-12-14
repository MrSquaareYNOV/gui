import { Button } from '@mui/material';
import { FC } from 'react';

import styles from './Find.module.scss';

export const Find: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Button variant="contained" sx={{ width: '100%' }}>
          Trouver des vélos
        </Button>
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="contained" sx={{ width: '100%' }}>
          Trouver des utilisateurs
        </Button>
      </div>
    </div>
  );
};
