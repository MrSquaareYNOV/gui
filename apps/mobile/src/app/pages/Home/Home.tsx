import {LatLngExpression} from 'leaflet';
import React, {FunctionComponent} from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';

import logo from '../../../assets/logo.png';

import styles from './Home.module.scss';
import {Button} from "@mui/material";
import Nav, {Page} from "../../components/Nav/Nav";

interface OwnProps {}

type Props = OwnProps;

const Home: FunctionComponent<Props> = (props) => {
  const position: LatLngExpression = [43.604652, 1.444209];

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <img src={logo} alt="Logo" />
        <div>
          <h3>TOULOUSE</h3>
          <p>78 bikes disponibles dans votre ville</p>
        </div>
      </div>

      <div className={styles.map}>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {/*<Marker position={position}>*/}
          {/*  <Popup>*/}
          {/*    A pretty CSS3 popup. <br /> Easily customizable.*/}
          {/*  </Popup>*/}
          {/*</Marker>*/}
        </MapContainer>
      </div>

      <div className={styles.cta}><Button variant="contained">ME TROUVER UN BIKE</Button></div>

      <Nav selected={Page.map} />
    </div>
  );
};

export default Home;
