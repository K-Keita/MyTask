import React from "react";
import { useDispatch } from "react-redux";
import { MyCardNight } from "../components/myCard/index";
import { push } from "connected-react-router";
import { SecondButton } from "../components/UIkit";
import { homeCards } from "../dataset";
import styles from "../public/styles/description/Description.module.scss";

const DescriptionNight = () => {
  const dispatch = useDispatch();

  return (
    <>
      <h2 className={styles.main_title}>〜明日のカードを作成しよう〜</h2>
      <div className={styles.min_container}>
        <MyCardNight
          icon={homeCards[11].icon}
          message={homeCards[11].message}
          name={homeCards[11].username}
          taskNum={homeCards[11].taskNum}
          runTask={homeCards[11].runTask}
          taskList={homeCards[11].taskList}
          time={homeCards[11].time}
        />
      </div>
      <p className={styles.description_text}>
        ・・・明日のやること、起床時間などを登録し、自分のタスクカードを作成しましょう。作成は、メニュー内の「明日のカードを作成」から行えます。
      </p>
      <SecondButton
        label={"次へ"}
        fullWidth={true}
        onClick={() => dispatch(push("/description/morning"))}
      />
      <footer className={styles.footer_label} />
    </>
  );
};

export default DescriptionNight;
