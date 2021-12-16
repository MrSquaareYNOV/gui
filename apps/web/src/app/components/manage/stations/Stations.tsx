import { Button } from '@mui/material';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { StationList } from '../../stations/StationList';

import styles from './Stations.module.scss';
import { StationRepository } from '../../../repositories/station';

export const ManageStations: FC = () => {
  const stationsRepository = new StationRepository();
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Gestion des stations</h1>
        <Button
          variant="contained"
          onClick={() => history.push('/manage/stations/add')}
        >
          Ajouter
        </Button>
      </div>
      <StationList
        stations={stationsRepository.getStations()}
        manage={true}
        onEdit={(station) =>
          history.push(`/manage/stations/edit/${station.id}`)
        }
      />
    </div>
  );
};
