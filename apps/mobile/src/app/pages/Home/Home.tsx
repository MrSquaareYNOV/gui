import 'leaflet/dist/leaflet.css';

import {ParkRepository, StationRepository} from '@gui-nx/repositories';
import {Errors, ParkDTO, StationDTO} from '@gui-nx/types';
import {Button} from "@mui/material";
import L, {LatLngExpression} from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import React, {FunctionComponent, useEffect, useState} from 'react';
import {Circle,MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';

import logo from '../../../assets/logo.png';
import Nav, {Page} from "../../components/Nav/Nav";
import styles from './Home.module.scss';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

interface OwnProps {
}

type Props = OwnProps;

const Home: FunctionComponent<Props> = (props) => {
  const position: LatLngExpression = [43.609379506911765, 1.4416139181721617];

  const parkRepository = ParkRepository.get();
  const stationRepository = StationRepository.get();

  const [park, setPark] = useState<ParkDTO>();

  const [stations, setStations] = useState<StationDTO[]>();
  const [errors, setErrors] = useState<Errors>();

  const getPark = async () => {
    try {
      const toulouse = await parkRepository.getPark("6cf1ff5e-eaf4-4fc3-bf70-7345bdccc52c");

      setPark(toulouse);
      setErrors(undefined);
    } catch (e) {
      if (e instanceof Errors) {
        setErrors(e);
      } else {
        console.error(e);
      }
    }
  };

  const getStations = async () => {
    try {
      const stations = await stationRepository.getStations();

      setStations(stations);
      setErrors(undefined);
    } catch (e) {
      if (e instanceof Errors) {
        setErrors(e);
      } else {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    getStations();
    getPark();
  }, []);

  const getStationLocation = (station: StationDTO): LatLngExpression => {
    const stationX = station.location.split(",")[0];
    const stationY = station.location.split(",")[1];
    const stationLoc: [number, number] = [parseFloat(stationX) || 0, parseFloat(stationY) || 0];
    return stationLoc;
  }

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <img src={logo} alt="Logo"/>
        <div>
          <h3>TOULOUSE</h3>
          <p>67 bikes disponibles dans votre ville</p>
        </div>
      </div>

      <div className={styles.map}>
        <MapContainer center={position} zoom={15} scrollWheelZoom={false} tap={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          {stations?.map((station) => {
            const pos = getStationLocation(station);
            return (
              <Marker position={pos} key={station._id}>
                <Popup>
                  <p>{station.totalBikes > 1 ? station.totalBikes + " bikes disponibles" : station.totalBikes + " bike disponible"}</p>
                </Popup>
              </Marker>
            )
          })}
          <Circle center={position} radius={10} pathOptions={{color: 'red'}}/>
        </MapContainer>
      </div>

      <div className={styles.cta}><Button variant="contained">ME TROUVER UN BIKE</Button></div>

      <Nav selected={Page.map}/>
    </div>
  );
};

export default Home;
