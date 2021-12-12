import { Button } from '@mui/material';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { ParkList } from '../../parks/ParkList';
import { BikeDTO } from '../../../types/bike';

import styles from './Parks.module.scss';
import { ParkRepository } from '../../../repositories/park';

export const ManageParks: FC = () => {
  const parksRepository = new ParkRepository();
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Gestion des parks</h1>
      </div>
      <ParkList parks={parksRepository.parks} />
    </div>
  );
};
