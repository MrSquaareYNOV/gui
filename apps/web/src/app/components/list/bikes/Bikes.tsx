import { BikeRepository } from '@gui-nx/repositories';
import { BikeDTO, Errors } from '@gui-nx/types';
import { Alert, AlertTitle, Button, LinearProgress } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { BikeList } from '../../bikes/BikeList';
import styles from './Bikes.module.scss';

export const Bikes: FC = () => {
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
        <h1 className={styles.header}>Liste des vélos</h1>
        <Button
          variant="contained"
          onClick={() => history.push('/manage/bikes')}
        >
          Gérer
        </Button>
      </div>
      <BikeList bikes={bikes} />
    </div>
  );
};
