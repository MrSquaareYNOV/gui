import { ParkDTO, Error } from '@gui-nx/types';
import { Button, TextField } from '@mui/material';
import { ChangeEventHandler, FC, FormEventHandler } from 'react';

import styles from './ParkForm.module.scss';

type Props = {
  park: ParkDTO;
  errors: Record<keyof Omit<ParkDTO, 'id'>, Error[]>;
  onChange?: ChangeEventHandler;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};

export const ParkForm: FC<Props> = ({ park, errors, onChange, onSubmit }) => {
  return (
    <form className={styles.container} onSubmit={onSubmit}>
      {park.id ? (
        <div className={styles.inputContainer}>
          <TextField
            id="id"
            label="ID"
            variant="outlined"
            value={park.id}
            onChange={onChange}
            disabled
          />
        </div>
      ) : null}
      <div className={styles.inputContainer}>
        <TextField
          id="name"
          label="Nom"
          variant="outlined"
          value={park.name}
          onChange={onChange}
          error={!!errors.name.length}
          helperText={errors.name.map((error) => {
            return <div key={error.code}>{error.message}</div>;
          })}
        />
      </div>
      <div className={styles.inputContainer}>
        <TextField
          id="location"
          label="Localisation"
          variant="outlined"
          value={park.location}
          onChange={onChange}
          error={!!errors.location.length}
          helperText={errors.location.map((error) => {
            return <div key={error.code}>{error.message}</div>;
          })}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="contained" type="submit">
          {park.id ? 'Éditer' : 'Ajouter'}
        </Button>
      </div>
    </form>
  );
};
