import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Divider } from "@material-ui/core";
import { InputText, LinkButton, SecondButton } from "../components/UIkit";
import { resetPassword } from "../reducks/users/operations";
import styles from "../public/styles/App.module.scss";

const Reset = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  return (
    <div className={styles.main_container}>
      <h2 className={styles.main_title}>〜Reset Password〜</h2>
      <InputText
        label={"email"}
        fullWidth={true}
        onChange={inputEmail}
        type={"email"}
        value={email}
      />
      <div className={styles.medium_space} />
      <SecondButton
        label={"リセット用メールを送る"}
        fullWidth={true}
        onClick={() => {
          dispatch(resetPassword(email));
        }}
      />
      <Divider />
      <LinkButton label={"・サインイン画面に戻る"} path={"/signin"} />
    </div>
  );
};

export default Reset;
