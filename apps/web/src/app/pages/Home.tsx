import { Avatar, Button } from '@mui/material';
import { FC } from 'react';
import { Route, useHistory } from 'react-router-dom';

import styles from './Home.module.scss';
import { Find } from '../components/home/find/Find';
import { List } from '../components/home/list/List';
import { Manage } from '../components/home/manage/Manage';
import { Bikes } from '../components/home/list/Bikes';
import { Stations } from '../components/home/list/Stations';
import { Parks } from '../components/home/list/Parks';
import { Users } from '../components/home/list/Users';
import { ManageBikes } from '../components/home/manage/Bikes';
import { ManageStations } from '../components/home/manage/Stations';
import { ManageParks } from '../components/home/manage/Parks';
import { ManageUsers } from '../components/home/manage/Users';


export const Home: FC = () => {
  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarPane}>
          <Avatar
            alt="John Doe"
            src="/assets/unknown.png"
            sx={{ width: '150px', height: '150px' }}
          />
          <h1 className={styles.paneHeader}>John Doe</h1>
          <p className={styles.paneBikeInformation}>5000 vélos dans le monde</p>
        </div>
        <div className={styles.sidebarNavigation}>
          <div className={styles.navigationButtonContainer}>
            <Button
              variant="contained"
              sx={{ width: '100%' }}
              onClick={() => history.push('/home')}
            >
              Liste
            </Button>
          </div>
          <div className={styles.navigationButtonContainer}>
            <Button
              variant="contained"
              sx={{ width: '100%' }}
              onClick={() => history.push('/home/manage')}
            >
              Gérer
            </Button>
          </div>
          <div className={styles.navigationButtonContainer}>
            <Button
              variant="contained"
              sx={{ width: '100%' }}
              onClick={() => history.push('/home/find')}
            >
              Trouver
            </Button>
          </div>
        </div>
      </div>


      { /* Route HOME */}

      <div className={styles.main}>
        <Route exact path="/home">
          <List />
        </Route>

        {/* Route LIST */}
        <Route exact path="/home/bikes">
          <Bikes />
        </Route>
        <Route exact path="/home/stations">
          <Stations />
        </Route>
        <Route exact path="/home/parks">
          <Parks />
        </Route>
        <Route exact path="/home/users">
          <Users />
        </Route>
        <Route exact path="/home/manage">
          <Manage />
        </Route>

        {/* Route FIND */}
        <Route exact path="/home/find">
          <Find />
        </Route>

        {/* Route MANAGE */}
        <Route exact path="/home/manage/bikes">
          <ManageBikes />
        </Route>
        <Route exact path="/home/manage/stations">
          <ManageStations />
        </Route>
        <Route exact path="/home/manage/parks">
          <ManageParks />
        </Route>
        <Route exact path="/home/manage/users">
          <ManageUsers />
        </Route>
      </div>
    </div>
  );
};
