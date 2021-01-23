import React from "react";
import SyncIcon from "@material-ui/icons/Sync";
import styles from "../../public/styles/header/Header.module.scss";

const SecondBar = (props) => {
  const helpButton =
    props.title === "HOME" ? (
      <div className={styles.side_button} onClick={props.help}>
        Help
      </div>
    ) : (
      ""
    );

  const exitButton =
    props.title === props.groupName ? (
      <div className={styles.side_button} onClick={props.exit}>
        退会
      </div>
    ) : (
      ""
    );

  return (
    <div className={styles.second_bar}>
      <div className={styles.flex_center} style={{ width: "20%" }}>
        <div className={styles.icon_text}>カード</div>
        <div
          className={styles.icon_position__change}
          onClick={props.changeMode}
        >
          <SyncIcon />
        </div>
      </div>
      <p>{props.title}</p>
      {helpButton}
      {exitButton}
    </div>
  );
};

export default SecondBar;
