import { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { BikeForm } from '../../bikes/BikeForm';

import styles from './Bike.module.scss';
import { BikeRepository } from '../../../repositories/bike';
import { BikeDTO, Errors } from '@gui-nx/types';
import { Alert, AlertTitle, LinearProgress } from '@mui/material';
import { Formik } from 'formik';

type Params = {
  id?: string;
};

export const ManageBike: FC = () => {
  const bikeRepository = BikeRepository.get();
  const { id } = useParams<Params>();
  const history = useHistory();

  const [bike, setBike] = useState<BikeDTO>();
  const [errors, setErrors] = useState<Errors>();

  const getBike = async (id: string) => {
    try {
      const bike = await bikeRepository.getBike(id);

      setBike(bike);
      setErrors(undefined);
    } catch (e) {
      if (e instanceof Errors) {
        setErrors(e);
      } else {
        console.error(e);
      }
    }
  };

  const createBike = async (bike: Omit<BikeDTO, 'id'>) => {
    try {
      await bikeRepository.createBike(bike);

      setErrors(undefined);

      history.push('/manage/bikes');
    } catch (e) {
      if (e instanceof Errors) {
        setErrors(e);
      } else {
        console.error(e);
      }
    }
  };

  const editBike = async (id: string, bike: Partial<Omit<BikeDTO, 'id'>>) => {
    try {
      await bikeRepository.editBike(id, bike);

      setErrors(undefined);

      history.push('/manage/bikes');
    } catch (e) {
      if (e instanceof Errors) {
        setErrors(e);
      } else {
        console.error(e);
      }
    }
  };

  const onSubmit = (values: any) => {
    if (id) {
      editBike(id, values);
    } else {
      createBike(values);
    }
  };

  useEffect(() => {
    if (id) {
      getBike(id);
    }
  }, [id]);

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

  if (id && !bike) {
    return (
      <div className={styles.container}>
        <LinearProgress />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>{bike ? 'Éditer' : 'Ajouter'} un vélo</h1>
      </div>
      <Formik
        initialValues={
          bike || {
            id: '',
            name: '',
          }
        }
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleSubmit }) => {
          return (
            <BikeForm
              bike={values}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          );
        }}
      </Formik>
    </div>
  );
};
