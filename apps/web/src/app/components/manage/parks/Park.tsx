import { ParkRepository, StationRepository } from '@gui-nx/repositories';
import { Errors, ParkDTO, StationDTO } from '@gui-nx/types';
import { Alert, AlertTitle, LinearProgress } from '@mui/material';
import { Formik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { ParkForm } from '../../parks/ParkForm';
import styles from './Park.module.scss';

type Params = {
  id?: string;
};

export const ManagePark: FC = () => {
  const parkRepository = ParkRepository.get();
  const stationRepository = StationRepository.get();
  const { id } = useParams<Params>();
  const history = useHistory();

  const [park, setPark] = useState<ParkDTO>();
  const [stations, setStations] = useState<StationDTO[]>();
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
    stationsIds:
      fieldErrors?.filter(
        (error) => error.code === 'INVALID_FIELD_STATIONSIDS'
      ) || [],
  };

  const getPark = async (id: string) => {
    try {
      const park = await parkRepository.getPark(id);

      setPark(park);
      setErrors(undefined);
    } catch (e) {
      if (e instanceof Errors) {
        setErrors(e);
      } else {
        console.error(e);
      }
    }
  };

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

  const createPark = async (park: Omit<ParkDTO, 'id'>) => {
    try {
      await parkRepository.createPark(park);

      setErrors(undefined);

      history.push('/manage/parks');
    } catch (e) {
      if (e instanceof Errors) {
        setErrors(e);
      } else {
        console.error(e);
      }
    }
  };

  const editPark = async (id: string, park: Partial<Omit<ParkDTO, 'id'>>) => {
    try {
      await parkRepository.editPark(id, park);

      setErrors(undefined);

      history.push('/manage/parks');
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
      editPark(id, values);
    } else {
      createPark(values);
    }
  };

  useEffect(() => {
    if (id) {
      getPark(id);
    }

    getStations();
  }, [id]);

  if ((id && !park) || !stations) {
    return (
      <div className={styles.container}>
        <LinearProgress />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>{park ? 'Éditer' : 'Ajouter'} un parc</h1>
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
          park || {
            id: '',
            name: '',
            location: '',
            stationsIds: [],
          }
        }
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleSubmit }) => {
          return (
            <ParkForm
              park={values}
              stations={stations}
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
