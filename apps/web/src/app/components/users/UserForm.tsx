import { UserDTO } from '@gui-nx/types';
import { Button, TextField } from '@mui/material';
import { FC, FormEventHandler } from 'react';

import styles from './UserForm.module.scss';

type Props = {
  user?: UserDTO;
  onSubmit?: FormEventHandler;
};

export const UserForm: FC<Props> = ({ user, onSubmit }) => {
  return (
    <form className={styles.container} onSubmit={onSubmit}>
      {user ? (
        <div className={styles.inputContainer}>
          <TextField
            id="id"
            label="ID"
            variant="outlined"
            value={user?.id || ''}
            fullWidth
            disabled
          />
        </div>
      ) : null}
      <div className={styles.inputContainer}>
        <TextField
          id="email"
          label="E-mail"
          variant="outlined"
          value={user?.email || ''}
          fullWidth
        />
      </div>
      <div className={styles.inputContainer}>
        <TextField
          id="password"
          label="Mot de passe"
          variant="outlined"
          value={''}
          fullWidth
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="contained" type="submit">
          {user ? 'Éditer' : 'Ajouter'}
        </Button>
      </div>
    </form>
  );
};
