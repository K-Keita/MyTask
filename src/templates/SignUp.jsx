import React, { useCallback, useState } from "react";
import { Divider } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { InputText, LinkButton, SecondButton } from "../components/UIkit";
import { signUp } from "../reducks/users/operations";
import styles from "../public/styles/App.module.scss";

const SignUp = () => {
  const [confirmPassword, setConfirmPassword] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [username, setUsername] = useState("");

  const dispatch = useDispatch();

  const inputUsername = useCallback(
    (event) => {
      setUsername(event.target.value);
    },
    [setUsername]
  );
  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );
  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );
  const inputConfirmPassword = useCallback(
    (event) => {
      setConfirmPassword(event.target.value);
    },
    [setConfirmPassword]
  );

  return (
    <div className={styles.main_container}>
      <h2 className={styles.main_title}>〜Sign Up〜</h2>
      <InputText
        label={"username"}
        fullWidth={true}
        onChange={inputUsername}
        type={"text"}
        id={"username"}
        value={username}
      />
      <InputText
        label={"email"}
        fullWidth={true}
        onChange={inputEmail}
        id={"email"}
        type={"email"}
        value={email}
      />
      <InputText
        label={"password"}
        fullWidth={true}
        onChange={inputPassword}
        id={"password"}
        type={"password"}
        value={password}
      />
      <InputText
        label={"password(再確認)"}
        fullWidth={true}
        onChange={inputConfirmPassword}
        id={"confirmPassword"}
        type={"password"}
        value={confirmPassword}
      />
      <div className={styles.medium_space} />
      <SecondButton
        label={"アカウント登録"}
        fullWidth={true}
        onClick={() => {
          dispatch(signUp(username, email, password, confirmPassword));
        }}
      />
      <Divider />
      <LinkButton label={"・アカウントをお持ちの方はこちら"} path={"/signin"} />
      <LinkButton label={"・タイトル画面に戻る"} path={"/"} />
    </div>
  );
};

export default SignUp;
