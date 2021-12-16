import { Error,StationDTO } from '@gui-nx/types';
import { Button, TextField } from '@mui/material';
import { ChangeEventHandler, FC, FormEventHandler } from 'react';

import styles from './StationForm.module.scss';

type Props = {
  station: StationDTO;
  errors: Record<keyof Omit<StationDTO, 'id'>, Error[]>;
  onChange?: ChangeEventHandler;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};

export const StationForm: FC<Props> = ({
  station,
  errors,
  onChange,
  onSubmit,
}) => {
  return (
    <form className={styles.container} onSubmit={onSubmit}>
      {station.id ? (
        <div className={styles.inputContainer}>
          <TextField
            id="id"
            label="ID"
            variant="outlined"
            value={station.id}
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
          value={station.name}
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
          value={station.location}
          onChange={onChange}
          error={!!errors.location.length}
          helperText={errors.location.map((error) => {
            return <div key={error.code}>{error.message}</div>;
          })}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="contained" type="submit">
          {station.id ? 'Éditer' : 'Ajouter'}
        </Button>
      </div>
    </form>
  );
};
