import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { SecondButton } from "../components/UIkit";
import styles from "../public/styles/description/Description.module.scss";

const DescriptionGroups = () => {
  const dispatch = useDispatch();

  return (
    <>
      <h2 className={styles.main_title}>〜グループの作成〜</h2>
      <div className={styles.min_container}>
        <div className={styles.min_card}>
          <div
            className={styles.block__task}
            style={{ borderTop: "solid 1px #00acc1" }}
          >
            {[
              "レスポンシブデザインの学習",
              "もくもく会に参加",
              "「Webを支える技術」を読む",
            ].map((task, index) => {
              return (
                <p key={index}>
                  {index + 1}: {task}
                </p>
              );
            })}
          </div>
          <div className={styles.small_space} />
          <div className={styles.message_container}>
            {"今日は、みんなで集まって作業します"}
          </div>
        </div>
        <div className={styles.small_space} />
        <div className={styles.min_card__reverse}>
          <div
            className={styles.block__task}
            style={{ borderTop: "solid 1px #00acc1" }}
          >
            {["フレックスボックスの復習", "JavaScriptの学習"].map(
              (task, index) => {
                return (
                  <p key={index}>
                    {index + 1}: {task}
                  </p>
                );
              }
            )}
          </div>
          <div className={styles.small_space} />
          <div className={styles.message_container}>
            {"今日からJavaScriptに入ります！"}
          </div>
        </div>
      </div>
      <p className={styles.description_text}>
        ・・・グループの作成・グループへの参加は、「新規グループ」から行えます。仲間とタスクを共有することによって、モチベーションアップにつながるはずです。
      </p>
      <SecondButton
        label={"ホーム画面"}
        fullWidth={true}
        onClick={() => dispatch(push("/"))}
      />
      <SecondButton
        label={"戻る"}
        fullWidth={true}
        onClick={() => dispatch(push("/description/morning"))}
      />
      <div className={styles.medium_space} />
      <div className={styles.footer_label} />
    </>
  );
};

export default DescriptionGroups;
