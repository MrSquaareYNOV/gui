import { Button } from '@mui/material';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { ParkList } from '../../parks/ParkList';

import styles from './Parks.module.scss';
import { ParkRepository } from '../../../repositories/park';

export const ManageParks: FC = () => {
  const parksRepository = new ParkRepository();
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.header}>Gestion des parks</h1>
        <Button
          variant="contained"
          onClick={() => history.push('/manage/parks/add')}
        >
          Ajouter
        </Button>
      </div>
      <ParkList
        parks={parksRepository.getParks()}
        manage={true}
        onEdit={(park) => history.push(`/manage/parks/edit/${park.id}`)}
      />
    </div>
  );
};
