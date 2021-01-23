import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards, fetchMyCard } from "../reducks/cards/operations";
import { fetchGroupCardsList } from "../reducks/groups/operations";
import { getCards, getMyCard } from "../reducks/cards/selectors";
import { getGroupUsersId } from "../reducks/groups/selectors";
import { getUserId } from "../reducks/users/selectors";
import { MyCardMorning, MyCardNight } from "../components/myCard/index";
import { LinkButton } from "../components/UIkit";
import styles from "../public/styles/myCard/CardList.module.scss";

const CardList = () => {
  let id = window.location.pathname;
  if (id !== "") {
    id = id.split("/")[1];
  }
  if (id !== "") {
    id = window.location.pathname.split("/list")[1];
  }
  if (id !== "") {
    id = id.split("/")[1];
  }

  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const cards = getCards(selector),
    groupUsersId = getGroupUsersId(selector),
    myCard = getMyCard(selector),
    uid = getUserId(selector);

  const cardsList = [];

  const CARD = id === "" ? [myCard] : cards;

  //それぞれのカード情報を子コンポーネントに渡す
  CARD.forEach((card) => {
    const nextTaskList =
      card.nextTaskList.length > 0 ? card.nextTaskList : ["タスクなし"];

    const scheduledTime = card.hours + ":" + card.minutes;

    const morningCard = (
      <MyCardMorning
        date={card.date}
        icon={card.icon}
        message={card.enthusiasmText}
        name={card.username}
        scheduledTime={scheduledTime}
        taskList={nextTaskList}
        taskNum={card.nextTaskList.length}
        time={card.wakeupTime}
      />
    );

    const nightCard = (
      <MyCardNight
        date={card.date}
        icon={card.icon}
        message={card.lookingBackText}
        name={card.username}
        taskNum={card.prevTaskList.length}
        time={scheduledTime}
        runTask={card.runTask}
        taskList={nextTaskList}
      />
    );

    const myCard = card.mode === "morning" ? morningCard : nightCard;
    cardsList.push(myCard);
  });

  //グループのユーザー情報取得
  useEffect(() => {
    if (id !== "") {
      dispatch(fetchGroupCardsList(id, uid));
    }
  }, [id, dispatch, uid]);

  //それぞれのカード情報を取得(ホームの場合、自分のカード情報を取得）
  useEffect(() => {
    if (groupUsersId.length === 0) {
      dispatch(fetchMyCard(uid));
    } else {
      dispatch(fetchCards(groupUsersId));
    }
  }, [groupUsersId, dispatch, uid]);

  return (
    <>
      <div className={styles.media_flex}>
        {myCard.id !== "" &&
          cardsList.map((card, index) => {
            return (
              <div key={index} className={styles.media_space}>
                {card}
              </div>
            );
          })}
        {myCard.id === "" && (
          <div className={styles.card_border}>
            <LinkButton
              label={"明日のタスクカードを作成"}
              path={"/regist/card"}
            />
          </div>
        )}
      </div>
      <div className={styles.footer_label} />
    </>
  );
};

export default CardList;
