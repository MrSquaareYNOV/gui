import { Button } from '@mui/material';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './Manage.module.scss';

export const Manage: FC = () => {
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Button
          variant="contained"
          sx={{ width: '100%' }}
          onClick={() => history.push('/manage/bikes')}
        >
          Gérer les vélos
        </Button>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          variant="contained"
          sx={{ width: '100%' }}
          onClick={() => history.push('/manage/stations')}
        >
          Gérer les stations
        </Button>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          variant="contained"
          sx={{ width: '100%' }}
          onClick={() => history.push('/manage/parks')}
        >
          Gérer les parcs
        </Button>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          variant="contained"
          sx={{ width: '100%' }}
          onClick={() => history.push('/manage/users')}
        >
          Gérer les utilisateurs
        </Button>
      </div>
    </div>
  );
};
