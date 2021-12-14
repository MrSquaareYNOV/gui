import { Button } from '@mui/material';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { StationList } from '../../stations/StationList';

import styles from './Stations.module.scss';
import { StationRepository } from '../../../repositories/station';

export const Stations: FC = () => {
  const stationRepository = new StationRepository();
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Liste des stations</h1>
        <Button
          variant="contained"
          onClick={() => history.push('/manage/stations')}
        >
          Gérer
        </Button>
      </div>
      <StationList stations={stationRepository.getStations()} />
    </div>
  );
};
