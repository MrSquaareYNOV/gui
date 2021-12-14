import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { BikeForm } from '../../bikes/BikeForm';

import styles from './Bike.module.scss';
import { BikeRepository } from '../../../repositories/bike';

type Params = {
  id?: string;
};

export const ManageBike: FC = () => {
  const bikeRepository = new BikeRepository();
  const { id } = useParams<Params>();

  const bike = id ? bikeRepository.getBike(id) : undefined;

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>{bike ? 'Éditer' : 'Ajouter'} un vélo</h1>
      </div>
      <BikeForm bike={bike} />
    </div>
  );
};
