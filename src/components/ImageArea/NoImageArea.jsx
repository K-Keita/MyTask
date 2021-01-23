import React from "react";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import styles from "../../public/styles/imageArea/ImageArea.module.scss";

const NoImageArea = () => {
  return (
    <div className={styles.noImage_area}>
      <div className={styles.icon_area}>
        <PermIdentityIcon fontSize="large" />
      </div>
    </div>
  );
};

export default NoImageArea;
