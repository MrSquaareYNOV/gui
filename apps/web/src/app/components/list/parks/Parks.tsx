import { Button } from '@mui/material';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { ParkList } from '../../parks/ParkList';

import styles from './Parks.module.scss';
import { ParkRepository } from '../../../repositories/park';

export const Parks: FC = () => {
  const parkRepository = new ParkRepository();
  const history = useHistory();

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
      <ParkList parks={parkRepository.getParks()} />
    </div>
  );
};
