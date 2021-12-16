import { BikeDTO, Error, StationDTO } from '@gui-nx/types';
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import { FormikHandlers } from 'formik';
import { FC } from 'react';

import styles from './StationForm.module.scss';

type Props = {
  station: StationDTO;
  bikes: BikeDTO[];
  errors: Record<keyof Omit<StationDTO, 'id'>, Error[]>;
  onChange?: FormikHandlers['handleChange'];
  onSubmit?: FormikHandlers['handleSubmit'];
};

export const StationForm: FC<Props> = ({
  station,
  bikes,
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
      <div className={styles.inputContainer}>
        <FormControl sx={{ width: 225 }}>
          <InputLabel id="currentBikesIds">Vélos actuels</InputLabel>
          <Select
            labelId="currentBikesIds"
            id="currentBikesIds"
            multiple
            input={<OutlinedInput label="Vélos actuels" />}
            renderValue={(selected) => selected.join(', ')}
            value={station.currentBikesIds}
            onChange={(e: any) => onChange && onChange('currentBikesIds')(e)}
          >
            {bikes.map((bike) => (
              <MenuItem key={bike.id} value={bike.id}>
                <Checkbox
                  checked={station.currentBikesIds.indexOf(bike.id) > -1}
                />
                <ListItemText primary={bike.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="contained" type="submit">
          {station.id ? 'Éditer' : 'Ajouter'}
        </Button>
      </div>
    </form>
  );
};
