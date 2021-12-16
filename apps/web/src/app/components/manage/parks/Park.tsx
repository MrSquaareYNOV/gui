import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { ParkForm } from '../../parks/ParkForm';

import styles from './Park.module.scss';
import { ParkRepository } from '../../../repositories/park';

type Params = {
  id?: string;
};

export const ManagePark: FC = () => {
  const parkRepository = new ParkRepository();
  const { id } = useParams<Params>();

  const park = id ? parkRepository.getPark(id) : undefined;

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>{park ? 'Éditer' : 'Ajouter'} un parc</h1>
      </div>
      <ParkForm park={park} />
    </div>
  );
};
