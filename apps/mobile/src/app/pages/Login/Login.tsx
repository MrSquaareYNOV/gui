import React, { FunctionComponent } from 'react';
import logo from "../../../assets/logo.png"
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { Link } from 'react-router-dom';

import styles from "./Login.module.scss";

interface OwnProps {}

type Props = OwnProps;

const Login: FunctionComponent<Props> = (props) => {

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false
  });

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  return (
    <div className={styles.login}>
      <div className={styles.header}>
        <img src={logo} alt="Logo" />
        <h1>GUICYCLE</h1>
      </div>
      <form action=""  className={styles.form}>
        <TextField id="standard-basic" label="Standard" variant="standard" />
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard" className={styles.password}>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Link to="/home" className={styles.link}>
          <Button variant="contained">LOGIN</Button>
        </Link>
        <Button variant="contained">REGISTER</Button>
      </form>
    </div>
  );
};

export default Login;
