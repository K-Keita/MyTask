import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MyCardMorning, MyCardNight } from "../components/myCard/index";
import { push } from "connected-react-router";
import { homeCards } from "../dataset";
import styles from "../public/styles/home/Home.module.scss"

const Home = () => {
  const dispatch = useDispatch();

  let time;
  const speed = 1;
  const scrollTop = document.body.scrollTop;

  const scroll = () => {
    time = setInterval(() => {
      window.scrollBy(0, scrollTop + speed);
    }, 100);
  };

  useEffect(() => {
    scroll();
    return () => {
      clearInterval(time);
    };
  }, );

  const selectLink = (path) => {
    clearInterval(time);
    dispatch(push(path));
  };

  return (
    <>
      <header className={styles.header_label} />
      <div className={styles.title_label}>
        <div className={styles.second_label} />
        <button
          className={styles.anonymous_button}
          onClick={() => selectLink("/signin/test")}
        >
          テストユーザーでログイン
        </button>
        <div className={styles.home_label}>
          <h2>My Task</h2>
          <p>タスク共有アプリ</p>
        </div>
        <div className={styles.second_label}>
          <p onClick={() => selectLink("/signup")}>・新規登録</p>
          <p onClick={() => selectLink("/signin")}>・ログイン</p>
        </div>
      </div>
      <div className={styles.cards_list}>
        <div className={styles.media_flex}>
          {homeCards.map((card, index) => {
            return (
              <div className={styles.media_space} key={String(index)}>
                {card.mode === "morning" ? (
                  <MyCardMorning
                    icon={card.icon}
                    message={card.message}
                    name={card.username}
                    taskNum={card.taskNum}
                    taskList={card.taskList}
                    time={card.time}
                  />
                ) : (
                  <MyCardNight
                    icon={card.icon}
                    message={card.message}
                    name={card.username}
                    taskNum={card.taskNum}
                    runTask={card.runTask}
                    taskList={card.taskList}
                    time={card.time}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <footer className={styles.footer_label} />
      </>
  );
};

export default Home;
