import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { StationForm } from '../../stations/StationForm';

import styles from './Station.module.scss';
import { StationRepository } from '../../../repositories/station';

type Params = {
  id?: string;
};

export const ManageStation: FC = () => {
  const stationRepository = new StationRepository();
  const { id } = useParams<Params>();

  const station = id ? stationRepository.getStation(id) : undefined;

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>
          {station ? 'Éditer' : 'Ajouter'} une station
        </h1>
      </div>
      <StationForm station={station} />
    </div>
  );
};
