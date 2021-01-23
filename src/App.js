import React from "react";
import { useSelector } from "react-redux";
import { getIsSignedIn } from "./reducks/users/selectors";
import { Header } from "./components/Header/index";
import Router from "./Router";
import styles from "./public/styles/App.module.scss";

const App = () => {
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  return (
    <>
      {isSignedIn && <Header />}
      <div className={styles.main_position}>
        <div className={styles.main}>
          <Router />
        </div>
      </div>
    </>
  );
};

export default App;
