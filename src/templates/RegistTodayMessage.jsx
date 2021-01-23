import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "@material-ui/core";
import { getMyCard } from "../reducks/cards/selectors";
import { getUserId } from "../reducks/users/selectors";
import { saveTodayCard, fetchMyCard } from "../reducks/cards/operations";
import { SecondButton, TextArea } from "../components/UIkit/index";
import { TaskList } from "../components/myCard/index";
import styles from "../public/styles/registration/Registration.module.scss";

const RegistTodayMessage = () => {
  let id = window.location.pathname;
  if (id !== "") {
    id = id.split("/")[1];
  }
  if (id !== "") {
    id = window.location.pathname.split("/wakeup")[1];
  }
  if (id !== "") {
    id = id.split("/")[1];
  }

  const d = new Date(),
    Hours = d.getHours(),
    Minutes = d.getMinutes();

  const currentTime = String(Hours) + ":" + ("00" + String(Minutes)).slice(-2);

  const [editing, setEditing] = useState(false),
    [enthusiasmText, setEnthusiasmText] = useState(
      " 今日も1日頑張りましょう。"
    ),
    [task, setTask] = useState(""),
    [taskLength, setTaskLength] = useState(0),
    [nextTaskList, setNextTaskList] = useState([]);

  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const uid = getUserId(selector),
    myCard = getMyCard(selector);

  const scheduledTime = myCard.hours + " : " + myCard.minutes;
  const wakeupTime =
    myCard.mode === "morning" ? myCard.wakeupTime : currentTime;
  const class_edit = editing ? styles.block : styles.hidden;
  const class_list = editing ? styles.hidden : styles.block;

  // タスクの記述処理
  const inputTask = useCallback(
    (event) => {
      setTask(event.target.value);
    },
    [setTask]
  );

  //メッセージの記述処理
  const inputMessage = useCallback(
    (event) => {
      setEnthusiasmText(event.target.value);
    },
    [setEnthusiasmText]
  );

  //タスク編集の開閉
  const toggleEditClass = () => {
    setEditing(!editing);
  };

  //ユーザーのカード情報を取得
  useEffect(() => {
    dispatch(fetchMyCard(uid));
  }, [dispatch, uid]);

  //今日のタスクの反映
  useEffect(() => {
    setNextTaskList(myCard.nextTaskList);
  }, [myCard]);

  //編集時、登録後のメッセージの表示
  useEffect(() => {
    if (myCard.mode === "morning") {
      setEnthusiasmText(myCard.enthusiasmText);
    }
  }, [wakeupTime, myCard.mode, myCard.enthusiasmText]);

  return (
    <div className={styles.main_container}>
      <h2 className={styles.main_title}>〜Good Morning!〜</h2>
      <p className={styles.sub_title}>
        おはようございます！今日も1日頑張りましょう。
      </p>
      <div className={styles.flex}>
        <div className={styles.sub_box}>
          <p>起床時間</p>
          <p>{wakeupTime}</p>
        </div>
        <div className={styles.sub_box}>
          <p>予定起床時間</p>
          <p>{scheduledTime}</p>
        </div>
      </div>
      <Divider />
      <div className={class_list}>
        <h2 className={styles.main_title}>〜Today-Task〜</h2>
        <p className={styles.sub_title}>今日のタスクを確認しましょう。</p>
        {myCard.nextTaskList.map((task, index) => {
          return (
            <p className={styles.sub_text} key={index}>
              {index + 1}: {task}
            </p>
          );
        })}
        <div className={styles.edit_button} onClick={toggleEditClass}>
          編集
        </div>
      </div>
      <div className={class_edit}>
        <TaskList
          label={"〜Edit-Task〜"}
          onChange={inputTask}
          task={task}
          taskLength={taskLength}
          taskList={nextTaskList}
          setTask={setTask}
          setTaskLength={setTaskLength}
          setTaskList={setNextTaskList}
        />
      </div>
      <Divider />
      <h2 className={styles.main_title}>〜Today-Message〜</h2>
      <p className={styles.sub_title}>
        今日の意気込みなど、コメントしましょう。
      </p>
      <TextArea
        defaultValue={enthusiasmText}
        fullWidth={true}
        label={"message"}
        onChange={inputMessage}
        rows={4}
        value={enthusiasmText}
      />
      <SecondButton
        fullWidth={true}
        label={"登録"}
        onClick={() =>
          dispatch(
            saveTodayCard(
              "morning",
              enthusiasmText,
              id,
              nextTaskList,
              uid,
              wakeupTime
            )
          )
        }
      />
      <div className={styles.small_space} />
    </div>
  );
};

export default RegistTodayMessage;
