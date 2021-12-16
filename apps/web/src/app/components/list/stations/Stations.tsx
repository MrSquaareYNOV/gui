import { Alert, AlertTitle, Button, LinearProgress } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { StationList } from '../../stations/StationList';

import styles from './Stations.module.scss';
import { StationRepository } from '@gui-nx/repositories';
import { Errors, StationDTO } from '@gui-nx/types';

export const Stations: FC = () => {
  const stationRepository = StationRepository.get();
  const history = useHistory();

  const [stations, setStations] = useState<StationDTO[]>();
  const [errors, setErrors] = useState<Errors>();

  const getStations = async () => {
    try {
      const stations = await stationRepository.getStations();

      setStations(stations);
      setErrors(undefined);
    } catch (e) {
      if (e instanceof Errors) {
        setErrors(e);
      } else {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    getStations();
  }, []);

  if (errors) {
    return (
      <div className={styles.container}>
        {errors.list.map((error, idx) => (
          <Alert key={idx} severity="error">
            <AlertTitle>{error.code}</AlertTitle>
            {error.message}
          </Alert>
        ))}
      </div>
    );
  }

  if (!stations) {
    return (
      <div className={styles.container}>
        <LinearProgress />
      </div>
    );
  }

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
      <StationList stations={stations} />
    </div>
  );
};
