import React, { useState } from "react";
import ImagePreview from "../ImageArea/ImagePreview";
import NoImageArea from "../ImageArea/NoImageArea";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import yellow from "@material-ui/core/colors/yellow";
import styles from "../../public/styles/myCard/MyCard.module.scss";

const MyCardNight = (props) => {
  const [openList, setOpenList] = useState(false),
    [moreListIcon, setMoreListIcon] = useState(true),
    [moreMessage, setMoreMessage] = useState(false),
    [moreMessageIcon, setMoreMessageIcon] = useState(true);

  const iconArea =
    props.icon === "" ? (
      <NoImageArea />
    ) : (
      <ImagePreview path={props.icon.path} />
    );

  const classList = openList ? styles.block__task : styles.hidden;
  const addBorder = openList ? styles.box : styles.box_under;
  const classMessage = moreMessage
    ? styles.message_container
    : styles.message_container_over;

  //タスク表示の開閉処理
  const toggleTask = () => {
    setOpenList(!openList);
    setMoreListIcon(!moreListIcon);
  };

  // メッセージの開閉処理
  const toggleMessage = () => {
    setMoreMessage(!moreMessage);
    setMoreMessageIcon(!moreMessageIcon);
  };

  const toggleMoreList = moreListIcon ? (
    <ExpandMoreIcon onClick={toggleTask} />
  ) : (
    <ExpandLessIcon onClick={toggleTask} />
  );

  const toggleMoreMessage = moreMessageIcon ? (
    <ExpandMoreIcon onClick={toggleMessage} />
  ) : (
    <ExpandLessIcon onClick={toggleMessage} />
  );

  const openMessageIcon = props.message.length >= 20 ? toggleMoreMessage : "";

  return (
    <div className={styles.card_border}>
      <Brightness2Icon
        className={styles.icon_position}
        fontSize="large"
        style={{ color: yellow[600] }}
      />
      <div className={styles.flex}>
        <div className={styles.text_box}>
          <div className={styles.card_name}>{props.name}</div>
          <div className={styles.flex}>
            <div className={styles.sub}>
              <p>起床予定</p>
              <p>{props.time}</p>
            </div>
            <div className={styles.sub}>
              <p>達成率</p>
              <p>
                {props.runTask}/{props.taskNum}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.text_date}>{props.date}</div>
        {iconArea}
      </div>
      <div className={addBorder}>
        <p className={styles.medium_size}>{"ー明日のタスクー"}</p>
        {toggleMoreList}
      </div>
      <div className={classList}>
        {props.taskList.map((task, index) => {
          return (
            <p key={index}>
              {index + 1}: {task}
            </p>
          );
        })}
      </div>
      <div className={styles.small_space} />
      <div className={classMessage}>
        {props.message}
        {openMessageIcon}
      </div>
    </div>
  );
};

export default MyCardNight;
