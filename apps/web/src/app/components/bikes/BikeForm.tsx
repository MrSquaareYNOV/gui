import { BikeDTO } from '@gui-nx/types';
import { Button, TextField } from '@mui/material';
import { ChangeEventHandler, FC, FormEventHandler } from 'react';

import styles from './BikeForm.module.scss';

type Props = {
  bike?: BikeDTO;
  onChange?: ChangeEventHandler;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};

export const BikeForm: FC<Props> = ({ bike, onChange, onSubmit }) => {
  return (
    <form className={styles.container} onSubmit={onSubmit}>
      {bike ? (
        <div className={styles.inputContainer}>
          <TextField
            id="id"
            label="ID"
            variant="outlined"
            value={bike?.id || ''}
            onChange={onChange}
            disabled
          />
        </div>
      ) : null}
      <div className={styles.inputContainer}>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          value={bike?.name || ''}
          onChange={onChange}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="contained" type="submit">
          {bike ? 'Éditer' : 'Ajouter'}
        </Button>
      </div>
    </form>
  );
};
