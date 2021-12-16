import { Error, ParkDTO, StationDTO } from '@gui-nx/types';
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

import styles from './ParkForm.module.scss';

type Props = {
  park: ParkDTO;
  stations: StationDTO[];
  errors: Record<keyof Omit<ParkDTO, 'id'>, Error[]>;
  onChange?: FormikHandlers['handleChange'];
  onSubmit?: FormikHandlers['handleSubmit'];
};

export const ParkForm: FC<Props> = ({
  park,
  stations,
  errors,
  onChange,
  onSubmit,
}) => {
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
      <div className={styles.inputContainer}>
        <FormControl sx={{ width: 225 }}>
          <InputLabel id="stationsIds">Stations</InputLabel>
          <Select
            labelId="stationsIds"
            id="stationsIds"
            multiple
            input={<OutlinedInput label="Vélos actuels" />}
            renderValue={(selected) => selected.join(', ')}
            value={park.stationsIds}
            onChange={(e: any) => onChange && onChange('stationsIds')(e)}
          >
            {stations.map((station) => (
              <MenuItem key={station.id} value={station.id}>
                <Checkbox checked={park.stationsIds.indexOf(station.id) > -1} />
                <ListItemText primary={station.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={styles.buttonContainer}>
        <Button variant="contained" type="submit">
          {park.id ? 'Éditer' : 'Ajouter'}
        </Button>
      </div>
    </form>
  );
};
