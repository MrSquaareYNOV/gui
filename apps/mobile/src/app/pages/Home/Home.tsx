import React, {FunctionComponent, useEffect} from 'react';
import logo from "../../../assets/logo.png";
import styles from "./Home.module.scss";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

interface OwnProps {}

type Props = OwnProps;

const Home: FunctionComponent<Props> = (props) => {

  return (
    <div className={styles.home}>

      <div className={styles.header}>
        <img src={logo} alt="Logo"/>
        <div>
          <h3>TOULOUSE</h3>
          <p>78 bikes disponibles dans votre ville</p>
        </div>
      </div>

      <div className={styles.map}>
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <nav className={styles.nav}>
        <ul>
          <li>Map<div className={styles.separator}></div></li>
          <li>Blank<div className={styles.separator}></div></li>
          <li>Blank<div className={styles.separator}></div></li>
          <li>Settings</li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
