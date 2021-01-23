import React, { useCallback } from "react";
import { IconButton } from "@material-ui/core";
import { storage } from "../../firebase/index";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ImagePreview from "./ImagePreview";
import styles from "../../public/styles/imageArea/ImageArea.module.scss";

const ImageArea = (props) => {
  const text = props.images !== "" ? "iconを変更する" : "iconを設定する";

  const uploadImage = useCallback(
    (event) => {
      const file = event.target.files;

      const imgWidth = "100px";
      const imgHeight = "100px";

      file.width = imgWidth;
      file.height = imgHeight;

      let blob = new Blob(file, { type: "image/jpeg" });

      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");

      const uploadRef = storage.ref("images").child(fileName);
      const uploadTask = uploadRef.put(blob);

      uploadTask.then(() => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const newImage = { id: fileName, path: downloadURL };
          props.setImages(newImage);
        });
      });
    },
    [props]
  );

  const deleteImage = useCallback(
    (id) => {
      if (props.images === "") {
        return false;
      }
      const ret = window.confirm("この画像を削除しますか？");
      if (!ret) {
        return false;
      } else {
        const newImages = "";
        props.setImages(newImages);
        return storage.ref("images").child(id).delete();
      }
    },
    [props]
  );

  return (
    <div className={styles.m_center}>
      <span>{text}</span>
      <IconButton className={styles.icon}>
        <label>
          <AddCircleIcon />
          <input
            className={styles.hidden}
            id="image"
            onChange={(event) => uploadImage(event)}
            type="file"
          />
        </label>
      </IconButton>
      {props.images !== "" && (
        <div
          className={styles.half_width}
          onClick={() => deleteImage(props.images.id)}
        >
          <ImagePreview path={props.images.path} />
        </div>
      )}
    </div>
  );
};

export default ImageArea;
