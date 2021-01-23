import React from "react";
import styles from "../../public/styles/imageArea/ImageArea.module.scss";

const ImagePreview = (props) => {
  return (
    <div className={styles.icon_box}>
      <div className={styles.image__thumb}>
        <img alt="プレビュー画像" src={props.path} loading="lazy" />
      </div>
    </div>
  );
};

export default ImagePreview;
