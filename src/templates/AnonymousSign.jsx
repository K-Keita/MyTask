import React, { useCallback, useState } from "react";
import { anonymousSignIn } from "../reducks/users/operations";
import { Divider } from "@material-ui/core";
import { InputText, LinkButton, SecondButton } from "../components/UIkit";
import { useDispatch } from "react-redux";
import styles from "../public/styles/App.module.scss";

const AnonymousSign = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");

  const inputUsername = useCallback(
    (event) => {
      setUsername(event.target.value);
    },
    [setUsername]
  );

  return (
    <div className={styles.main_container}>
      <h2 className={styles.main_title}>〜Anonymous Auth〜</h2>
      <InputText
        fullWidth={true}
        label={"username"}
        onChange={inputUsername}
        type={"username"}
        value={username}
      />
      <div className={styles.medium_space} />
      <SecondButton
        fullWidth={true}
        label={"テストユーザーでログイン"}
        onClick={() => {
          dispatch(anonymousSignIn(username));
        }}
      />
      <Divider />
      <LinkButton label={"・アカウント登録"} path={"/signUp"} />
      <LinkButton label={"・タイトル画面に戻る"} path={"/home"} />
    </div>
  );
};

export default AnonymousSign;
