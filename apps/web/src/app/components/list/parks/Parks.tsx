import { Alert, AlertTitle, Button, LinearProgress } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ParkList } from '../../parks/ParkList';

import styles from './Parks.module.scss';
import { ParkRepository } from '@gui-nx/repositories';
import { Errors, ParkDTO } from '@gui-nx/types';

export const Parks: FC = () => {
  const parkRepository = ParkRepository.get();
  const history = useHistory();

  const [parks, setParks] = useState<ParkDTO[]>();
  const [errors, setErrors] = useState<Errors>();

  const getParks = async () => {
    try {
      const parks = await parkRepository.getParks();

      setParks(parks);
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
    getParks();
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

  if (!parks) {
    return (
      <div className={styles.container}>
        <LinearProgress />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Liste des parcs</h1>
        <Button
          variant="contained"
          onClick={() => history.push('/manage/parks')}
        >
          Gérer
        </Button>
      </div>
      <ParkList parks={parks} />
    </div>
  );
};
