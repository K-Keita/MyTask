import React from "react";
import { useDispatch } from "react-redux";
import { MyCardMorning } from "../components/myCard/index";
import { push } from "connected-react-router";
import { SecondButton } from "../components/UIkit";
import { homeCards } from "../dataset";
import styles from "../public/styles/description/Description.module.scss";

const DescriptionMorning = () => {
  const dispatch = useDispatch();

  return (
    <>
      <h2 className={styles.main_title}>〜カードの切り替え〜</h2>
      <div className={styles.min_container}>
        <MyCardMorning
          icon={homeCards[3].icon}
          message={homeCards[3].message}
          name={homeCards[3].username}
          taskNum={homeCards[3].taskNum}
          taskList={homeCards[3].taskList}
          time={homeCards[3].time}
        />
      </div>
      <p className={styles.description_text}>
        ・・・起床時にカードの切り替えを行いましょう。カードの切り替えは、「起床する」から行えます。
      </p>
      <SecondButton
        label={"次へ"}
        fullWidth={true}
        onClick={() => dispatch(push("/description/groups"))}
      />
      <SecondButton
        label={"戻る"}
        fullWidth={true}
        onClick={() => dispatch(push("/description/night"))}
      />
      <div className={styles.footer_label} />
    </>
  );
};

export default DescriptionMorning;
