import { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { StationForm } from '../../stations/StationForm';

import styles from './Station.module.scss';
import { StationRepository } from '@gui-nx/repositories';
import { StationDTO, Errors, Error } from '@gui-nx/types';
import { Alert, AlertTitle, LinearProgress } from '@mui/material';
import { Formik } from 'formik';

type Params = {
  id?: string;
};

export const ManageStation: FC = () => {
  const stationRepository = StationRepository.get();
  const { id } = useParams<Params>();
  const history = useHistory();

  const [station, setStation] = useState<StationDTO>();
  const [errors, setErrors] = useState<Errors>();

  const globalErrors = errors?.list.filter(
    (err) => !err.code.startsWith('INVALID_FIELD')
  );
  const fieldErrors = errors?.list.filter((err) =>
    err.code.startsWith('INVALID_FIELD')
  );
  const formErrors = {
    name:
      fieldErrors?.filter((error) => error.code === 'INVALID_FIELD_NAME') || [],
    location:
      fieldErrors?.filter((error) => error.code === 'INVALID_FIELD_LOCATION') ||
      [],
    currentBikesIds:
      fieldErrors?.filter(
        (error) => error.code === 'INVALID_FIELD_CURRENTBIKESIDS'
      ) || [],
    totalBikes:
      fieldErrors?.filter(
        (error) => error.code === 'INVALID_FIELD_TOTALBIKES'
      ) || [],
  };

  const getStation = async (id: string) => {
    try {
      const station = await stationRepository.getStation(id);

      setStation(station);
      setErrors(undefined);
    } catch (e) {
      if (e instanceof Errors) {
        setErrors(e);
      } else {
        console.error(e);
      }
    }
  };

  const createStation = async (station: Omit<StationDTO, 'id'>) => {
    try {
      await stationRepository.createStation(station);

      setErrors(undefined);

      history.push('/manage/stations');
    } catch (e) {
      if (e instanceof Errors) {
        setErrors(e);
      } else {
        console.error(e);
      }
    }
  };

  const editStation = async (
    id: string,
    station: Partial<Omit<StationDTO, 'id'>>
  ) => {
    try {
      await stationRepository.editStation(id, station);

      setErrors(undefined);

      history.push('/manage/stations');
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
      editStation(id, values);
    } else {
      createStation(values);
    }
  };

  useEffect(() => {
    if (id) {
      getStation(id);
    }
  }, [id]);

  if (id && !station) {
    return (
      <div className={styles.container}>
        <LinearProgress />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>
          {station ? 'Éditer' : 'Ajouter'} une station
        </h1>
      </div>
      {globalErrors ? (
        <div className={styles.container}>
          {globalErrors.map((error, idx) => (
            <Alert key={idx} severity="error">
              <AlertTitle>{error.code}</AlertTitle>
              {error.message}
            </Alert>
          ))}
        </div>
      ) : null}
      <Formik
        initialValues={
          station || {
            id: '',
            name: '',
            location: '',
            currentBikesIds: [],
            totalBikes: 0,
          }
        }
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleSubmit }) => {
          return (
            <StationForm
              station={values}
              errors={formErrors}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          );
        }}
      </Formik>
    </div>
  );
};
