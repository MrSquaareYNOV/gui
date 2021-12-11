import { Button } from '@mui/material';
import { FC } from 'react';
import { Route, useHistory } from 'react-router-dom';

import styles from './Manage.module.scss';
import { BikeRepository } from '../../../repositories/bike';

export const Manage: FC = () => {
  const bikeRepository = new BikeRepository();
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Button variant="contained" sx={{ width: '100%' }} onClick={() => history.push('/home/manage/bikes')} >
          Gérer des vélos
        </Button>
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="contained" sx={{ width: '100%' }} onClick={() => history.push('/home/manage/stations')} >
          Gérer des stations
        </Button>
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="contained" sx={{ width: '100%' }} onClick={() => history.push('/home/manage/parks')}>
          Gérer des parcs
        </Button>
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="contained" sx={{ width: '100%' }} onClick={() => history.push('/home/manage/users')}>
          Gérer des utilisateurs
        </Button>
      </div>
    </div>
  );
};
