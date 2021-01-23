import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "@material-ui/core";
import {
  getUserId,
  getUsername,
  getUserIcon,
  getEnterGroupsId,
} from "../reducks/users/selectors";
import ImageArea from "../components/ImageArea/ImageArea";
import { InputText, SecondButton } from "../components/UIkit";
import { saveUserInfomation } from "../reducks/users/operations";
import styles from "../public/styles/registration/Registration.module.scss";

const EditMyInfomation = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const username = getUsername(selector);
  const userIcon = getUserIcon(selector);
  const enterGroups = getEnterGroupsId(selector);

  const [images, setImages] = useState(""),
    [name, setName] = useState("");

  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );

  //アカウント情報の変更
  const editInfomation = (images, name, uid, enterGroups) => {
    if (name === "") {
      alert("アカウント名が空白です");
      return false;
    }
    dispatch(saveUserInfomation(images, name, uid, enterGroups));
  };

  useEffect(() => {
    if (userIcon !== "") {
      setImages(userIcon);
    }
    setName(username);
  }, [username, userIcon]);

  return (
    <div className={styles.main_container}>
      <h2 className={styles.main_title}>〜Name〜</h2>
      <InputText
        fullWidth={true}
        label={"username"}
        onChange={inputName}
        type={"text"}
        value={name}
      />
      <Divider />
      <h2 className={styles.main_title}>〜Icon〜</h2>
      <ImageArea images={images} setImages={setImages} />
      <SecondButton
        fullWidth={true}
        label={"登録"}
        onClick={() => editInfomation(images, name, uid, enterGroups)}
      />
    </div>
  );
};

export default EditMyInfomation;
