import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Divider } from "@material-ui/core";
import { InputText, LinkButton, SecondButton } from "../components/UIkit";
import { signIn } from "../reducks/users/operations";
import styles from "../public/styles/App.module.scss";

const SignIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");

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

  return (
    <div className={styles.main_container}>
      <h2 className={styles.main_title}>〜Sign In〜</h2>
      <InputText
        label={"email"}
        fullWidth={true}
        onChange={inputEmail}
        id="email"
        type={"email"}
        value={email}
      />
      <InputText
        label={"password"}
        fullWidth={true}
        id="password"
        onChange={inputPassword}
        type={"password"}
        value={password}
      />
      <div className={styles.medium_space} />
      <SecondButton
        label={"サインイン"}
        fullWidth={true}
        onClick={() => {
          dispatch(signIn(email, password));
        }}
      />
      <Divider />
      <LinkButton label={"・アカウント登録はこちら"} path={"/signup"} />
      <LinkButton
        label={"・パスワードをお忘れの方はこちら"}
        path={"/signin/reset"}
      />
      <LinkButton label={"・タイトル画面に戻る"} path={"/home"} />
    </div>
  );
};

export default SignIn;
