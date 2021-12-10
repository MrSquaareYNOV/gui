import { Button } from '@mui/material';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './List.module.scss';

export const List: FC = () => {
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Button
          variant="contained"
          sx={{ width: '100%' }}
          onClick={() => history.push('/home/bikes')}
        >
          Liste des vélos
        </Button>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          variant="contained"
          sx={{ width: '100%' }}
          onClick={() => history.push('/home/stations')}
        >
          Liste des stations
        </Button>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          variant="contained"
          sx={{ width: '100%' }}
          onClick={() => history.push('/home/parks')}
        >
          Liste des parcs
        </Button>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          variant="contained"
          sx={{ width: '100%' }}
          onClick={() => history.push('/home/users')}
        >
          Liste des utilisateurs
        </Button>
      </div>
    </div>
  );
};
