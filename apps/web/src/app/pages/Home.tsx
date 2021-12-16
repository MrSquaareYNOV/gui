import { Avatar, Button } from '@mui/material';
import { FC, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';

import { Find } from '../components/find/Find';
import { Bikes } from '../components/list/bikes/Bikes';
import { List } from '../components/list/List';
import { Parks } from '../components/list/parks/Parks';
import { Stations } from '../components/list/stations/Stations';
import { Users } from '../components/list/users/Users';
import { ManageBike } from '../components/manage/bikes/Bike';
import { ManageBikes } from '../components/manage/bikes/Bikes';
import { Manage } from '../components/manage/Manage';
import { ManagePark } from '../components/manage/parks/Park';
import { ManageParks } from '../components/manage/parks/Parks';
import { ManageStation } from '../components/manage/stations/Station';
import { ManageStations } from '../components/manage/stations/Stations';
import { ManageUser } from '../components/manage/users/User';
import { ManageUsers } from '../components/manage/users/Users';
import styles from './Home.module.scss';

export const Home: FC = () => {
  const history = useHistory();

  const disconnect = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/login');
    }
  }, [history]);

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
          <div className={styles.navigationButtonContainer}>
            <Button
              variant="contained"
              sx={{ width: '100%' }}
              onClick={() => disconnect()}
            >
              Déconnexion
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
