import { BikeDTO, Error } from '@gui-nx/types';
import { Button, TextField } from '@mui/material';
import { ChangeEventHandler, FC, FormEventHandler } from 'react';

import styles from './BikeForm.module.scss';

type Props = {
  bike: BikeDTO;
  errors: Record<keyof Omit<BikeDTO, 'id'>, Error[]>;
  onChange?: ChangeEventHandler;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};

export const BikeForm: FC<Props> = ({ bike, errors, onChange, onSubmit }) => {
  return (
    <form className={styles.container} onSubmit={onSubmit}>
      {bike.id ? (
        <div className={styles.inputContainer}>
          <TextField
            id="id"
            label="ID"
            variant="outlined"
            value={bike.id}
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
          value={bike.name}
          onChange={onChange}
          error={!!errors.name.length}
          helperText={errors.name.map((error) => {
            return <div key={error.code}>{error.message}</div>;
          })}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="contained" type="submit">
          {bike.id ? 'Éditer' : 'Ajouter'}
        </Button>
      </div>
    </form>
  );
};
