import { ParkDTO } from '@gui-nx/types';
import { Button, TextField } from '@mui/material';
import { FC, FormEventHandler } from 'react';

import styles from './ParkForm.module.scss';

type Props = {
  park?: ParkDTO;
  onSubmit?: FormEventHandler;
};

export const ParkForm: FC<Props> = ({ park, onSubmit }) => {
  return (
    <form className={styles.container} onSubmit={onSubmit}>
      {park ? (
        <div className={styles.inputContainer}>
          <TextField
            id="id"
            label="ID"
            variant="outlined"
            value={park?.id || ''}
            fullWidth
            disabled
          />
        </div>
      ) : null}
      <div className={styles.inputContainer}>
        <TextField
          id="name"
          label="Nom"
          variant="outlined"
          value={park?.name || ''}
          fullWidth
        />
      </div>
      <div className={styles.inputContainer}>
        <TextField
          id="location"
          label="Localisation"
          variant="outlined"
          value={park?.location || ''}
          fullWidth
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="contained" type="submit">
          {park ? 'Éditer' : 'Ajouter'}
        </Button>
      </div>
    </form>
  );
};
