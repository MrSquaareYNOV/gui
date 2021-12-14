import { Avatar, Button } from '@mui/material';
import { FC } from 'react';
import { Route, useHistory } from 'react-router-dom';

import styles from './Home.module.scss';
import { Find } from '../components/find/Find';
import { List } from '../components/list/List';
import { Manage } from '../components/manage/Manage';
import { Bikes } from '../components/list/bikes/Bikes';
import { Stations } from '../components/list/stations/Stations';
import { Parks } from '../components/list/parks/Parks';
import { Users } from '../components/list/users/Users';
import { ManageBikes } from '../components/manage/bikes/Bikes';
import { ManageStations } from '../components/manage/stations/Stations';
import { ManageParks } from '../components/manage/parks/Parks';
import { ManageUsers } from '../components/manage/users/Users';
import { ParkForm } from '../components/parks/ParkForm';
import { ManagePark } from '../components/manage/parks/Park';
import { ManageBike } from '../components/manage/bikes/Bike';
import { ManageStation } from '../components/manage/stations/Station';
import { ManageUser } from '../components/manage/users/User';

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
              onClick={() => history.push('/list')}
            >
              Liste
            </Button>
          </div>
          <div className={styles.navigationButtonContainer}>
            <Button
              variant="contained"
              sx={{ width: '100%' }}
              onClick={() => history.push('/manage')}
            >
              Gérer
            </Button>
          </div>
          <div className={styles.navigationButtonContainer}>
            <Button
              variant="contained"
              sx={{ width: '100%' }}
              onClick={() => history.push('/find')}
            >
              Trouver
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.main}>
        {/* Route HOME */}

        {/* Route LIST */}
        <Route exact path="/list">
          <List />
        </Route>
        <Route exact path="/list/bikes">
          <Bikes />
        </Route>
        <Route exact path="/list/stations">
          <Stations />
        </Route>
        <Route exact path="/list/parks">
          <Parks />
        </Route>
        <Route exact path="/list/users">
          <Users />
        </Route>

        {/* Route MANAGE */}
        <Route exact path="/manage">
          <Manage />
        </Route>
        <Route exact path="/manage/bikes">
          <ManageBikes />
        </Route>
        <Route exact path="/manage/bikes/add">
          <ManageBike />
        </Route>
        <Route exact path="/manage/bikes/edit/:id">
          <ManageBike />
        </Route>
        <Route exact path="/manage/stations">
          <ManageStations />
        </Route>
        <Route exact path="/manage/stations/add">
          <ManageStation />
        </Route>
        <Route exact path="/manage/stations/edit/:id">
          <ManageStation />
        </Route>
        <Route exact path="/manage/parks">
          <ManageParks />
        </Route>
        <Route exact path="/manage/parks/add">
          <ManagePark />
        </Route>
        <Route exact path="/manage/parks/edit/:id">
          <ManagePark />
        </Route>
        <Route exact path="/manage/users">
          <ManageUsers />
        </Route>
        <Route exact path="/manage/users/add">
          <ManageUser />
        </Route>
        <Route exact path="/manage/users/edit/:id">
          <ManageUser />
        </Route>

        {/* Route FIND */}
        <Route exact path="/find">
          <Find />
        </Route>
      </div>
    </div>
  );
};
