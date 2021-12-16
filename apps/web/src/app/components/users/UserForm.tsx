import { Error,UserDTO } from '@gui-nx/types';
import { Button, TextField } from '@mui/material';
import { ChangeEventHandler, FC, FormEventHandler } from 'react';

import styles from './UserForm.module.scss';

type Props = {
  user: UserDTO;
  errors: Record<keyof Omit<UserDTO, 'id'>, Error[]>;
  onChange?: ChangeEventHandler;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};

export const UserForm: FC<Props> = ({ user, errors, onChange, onSubmit }) => {
  return (
    <form className={styles.container} onSubmit={onSubmit}>
      {user.id ? (
        <div className={styles.inputContainer}>
          <TextField
            id="id"
            label="ID"
            variant="outlined"
            value={user.id}
            onChange={onChange}
            disabled
          />
        </div>
      ) : null}
      <div className={styles.inputContainer}>
        <TextField
          id="email"
          label="E-mail"
          variant="outlined"
          value={user.email}
          onChange={onChange}
          error={!!errors.email.length}
          helperText={errors.email.map((error) => {
            return <div key={error.code}>{error.message}</div>;
          })}
        />
      </div>
      <div className={styles.inputContainer}>
        <TextField
          id="password"
          label="Mot de passe"
          variant="outlined"
          type="password"
          value={user.password}
          onChange={onChange}
          error={!!errors.password.length}
          helperText={errors.password.map((error) => {
            return <div key={error.code}>{error.message}</div>;
          })}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="contained" type="submit">
          {user.id ? 'Éditer' : 'Ajouter'}
        </Button>
      </div>
    </form>
  );
};
