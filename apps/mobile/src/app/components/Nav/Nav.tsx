import React, {FunctionComponent} from 'react';
import styles from "./Nav.module.scss";
import map from "../../../assets/map.png";
import settings from "../../../assets/settings.png";

export enum Page {
  map,
  blank1,
  blank2,
  settings
}

interface OwnProps {
  selected: Page
}

type Props = OwnProps;

const Nav: FunctionComponent<Props> = (props) => {

  return (
    <nav className={styles.nav}>
      <ul>
        <li><img className={props.selected === Page.map ? styles.selected : ""} src={map} alt="Map" /></li>
        <li><div className={styles.separator}></div></li>
        <li><p className={props.selected === Page.blank1 ? styles.selected : ""}>Blank</p></li>
        <li><div className={styles.separator}></div></li>
        <li><p className={props.selected === Page.blank2 ? styles.selected : ""}>Blank</p></li>
        <li><div className={styles.separator}></div></li>
        <li><img className={props.selected === Page.settings ? styles.selected : ""} src={settings} alt="Settings"/></li>
      </ul>
    </nav>
  );
};

export default Nav;
