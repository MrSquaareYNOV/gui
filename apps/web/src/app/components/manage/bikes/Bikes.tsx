import { Button } from '@mui/material';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { BikeList } from '../../bikes/BikeList';

import styles from './Bikes.module.scss';
import { BikeRepository } from '../../../repositories/bike';

export const ManageBikes: FC = () => {
  const bikeRepository = new BikeRepository();
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Gestion des vélos</h1>
        <Button
          variant="contained"
          onClick={() => history.push('/manage/bikes/add')}
        >
          Ajouter
        </Button>
      </div>
      <BikeList
        bikes={bikeRepository.getBikes()}
        manage={true}
        onEdit={(bike) => history.push(`/manage/bikes/edit/${bike.id}`)}
      />
    </div>
  );
};
