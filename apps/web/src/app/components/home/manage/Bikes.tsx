import { Button } from '@mui/material';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { BikeList } from '../../bikes/BikeList';
import { BikeDTO } from '../../../types/bike';

import styles from './Bikes.module.scss';
import { BikeRepository } from '../../../repositories/bike';

export const ManageBikes: FC = () => {
  const bikeRepository = new BikeRepository();
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Liste des vélos</h1>
        <Button
          variant="contained"
          onClick={() => history.push('/manage/bikes')}
        >
          hello
        </Button>
      </div>
      <BikeList bikes={bikeRepository.bikes} />
    </div>
  );
};
