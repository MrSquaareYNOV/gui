import { Button } from '@mui/material';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { StationList } from '../../stations/StationList';
import { BikeDTO } from '../../../types/bike';

import styles from './Stations.module.scss';
import { StationRepository } from '../../../repositories/station';

export const ManageStations: FC = () => {
  const stationsRepository = new StationRepository();
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Gestion des stations</h1>
      </div>
      <StationList stations={stationsRepository.stations} />
    </div>
  );
};
