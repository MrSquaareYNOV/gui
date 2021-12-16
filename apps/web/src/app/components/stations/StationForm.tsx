import { StationDTO } from '@gui-nx/types';
import { Button, TextField } from '@mui/material';
import { FC, FormEventHandler } from 'react';

import styles from './StationForm.module.scss';

type Props = {
  station?: StationDTO;
  onSubmit?: FormEventHandler;
};

export const StationForm: FC<Props> = ({ station, onSubmit }) => {
  return (
    <form className={styles.container} onSubmit={onSubmit}>
      {station ? (
        <div className={styles.inputContainer}>
          <TextField
            id="id"
            label="ID"
            variant="outlined"
            value={station?.id || ''}
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
          value={station?.name || ''}
          fullWidth
        />
      </div>
      <div className={styles.inputContainer}>
        <TextField
          id="location"
          label="Localisation"
          variant="outlined"
          value={station?.location || ''}
          fullWidth
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="contained" type="submit">
          {station ? 'Éditer' : 'Ajouter'}
        </Button>
      </div>
    </form>
  );
};
