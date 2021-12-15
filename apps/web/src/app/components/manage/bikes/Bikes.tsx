import { Alert, AlertTitle, Button, LinearProgress } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { BikeList } from '../../bikes/BikeList';

import styles from './Bikes.module.scss';
import { BikeRepository } from '../../../repositories/bike';
import { BikeDTO, Errors } from '@gui-nx/types';

export const ManageBikes: FC = () => {
  const bikeRepository = BikeRepository.get();
  const history = useHistory();

  const [bikes, setBikes] = useState<BikeDTO[]>();
  const [errors, setErrors] = useState<Errors>();

  const getBikes = async () => {
    try {
      const bikes = await bikeRepository.getBikes();

      setBikes(bikes);
      setErrors(undefined);
    } catch (e) {
      if (e instanceof Errors) {
        setErrors(e);
      } else {
        console.error(e);
      }
    }
  };

  const deleteBike = async (id: string) => {
    try {
      await bikeRepository.deleteBike(id);

      setErrors(undefined);

      await getBikes();
    } catch (e) {
      if (e instanceof Errors) {
        setErrors(e);
      } else {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    getBikes();
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

  if (!bikes) {
    return (
      <div className={styles.container}>
        <LinearProgress />
      </div>
    );
  }

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
        bikes={bikes}
        manage={true}
        onEdit={(bike) => history.push(`/manage/bikes/edit/${bike.id}`)}
        onDelete={(bike) => deleteBike(bike.id)}
      />
    </div>
  );
};
