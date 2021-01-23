import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
import { Divider } from "@material-ui/core";
import { getMyCard } from "../reducks/cards/selectors";
import {
  getUserIcon,
  getUserId,
  getUsername,
} from "../reducks/users/selectors";
import { fetchMyCard, saveTomorrowCard } from "../reducks/cards/operations";
import {
  CheckBox,
  SecondButton,
  SelectBox,
  TextArea,
} from "../components/UIkit";
import { TaskList } from "../components/myCard/index";
import styles from "../public/styles/registration/Registration.module.scss";

const d = new Date();
const month = d.getMonth() + 1;
const day = d.getDate();
const date = `${month}/${day}`;

const RegistTomorrowTask = () => {
  let id = window.location.pathname;
  if (id !== "") {
    id = id.split("/")[1];
  }
  if (id !== "") {
    id = window.location.pathname.split("/regist/card")[1];
  }
  if (id !== "") {
    id = id.split("/")[1];
  }

  const [hours, setHours] = useState("7"),
    [lookingBackText, setLookingBackText] = useState(
      " 今日も1日お疲れ様でした。"
    ),
    [minutes, setMinutes] = useState("00"),
    [nextTaskList, setNextTaskList] = useState([]),
    [yesterdayTaskList, setYesterdayTaskList] = useState([]),
    [runTask, setRunTask] = useState(0),
    [task, setTask] = useState(""),
    [taskLength, setTaskLength] = useState(0);

  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const myCard = getMyCard(selector),
    uid = getUserId(selector),
    userIcon = getUserIcon(selector),
    username = getUsername(selector);

  const hoursArr = [...Array(24)].map((_, i) => i),
    minutesArr = [...Array(60)].map((_, i) => ("0" + i).slice(-2));
  const prevTaskList = id === "" ? myCard.nextTaskList : yesterdayTaskList;
  const [checkedTask, setCheckedTask] = useState([]);

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
      setLookingBackText(event.target.value);
    },
    [setLookingBackText]
  );

  //自分の最新のカード情報の取得
  useEffect(() => {
    dispatch(fetchMyCard(uid));
  }, [dispatch, uid]);

  //タスク編集時、登録したカード情報の取得
  useEffect(() => {
    if (id !== "") {
      db.collection("users")
        .doc(uid)
        .collection("cards")
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();

          setCheckedTask(data.checkedTask);
          setHours(data.hours);
          setLookingBackText(data.lookingBackText);
          setMinutes(data.minutes);
          setNextTaskList(data.nextTaskList);
          setRunTask(data.runTask);
          setYesterdayTaskList(data.prevTaskList);
        });
    }
  }, [id, uid]);

  return (
    <div className={styles.main_container}>
      {prevTaskList.length > 0 && (
        <div>
          <h2 className={styles.main_title}>〜GoodWork!〜</h2>
          <p className={styles.sub_title}>
            お疲れ様です。終了したタスクにチェックをつけましょう。
          </p>
          <div className={styles.m_center}>
            {prevTaskList.map((task, index) => {
              return (
                <div className={styles.task_box} key={index}>
                  <CheckBox
                    checkedTask={checkedTask}
                    index={index}
                    runTask={runTask}
                    setCheckedTask={setCheckedTask}
                    setRunTask={setRunTask}
                    task={task}
                  />
                </div>
              );
            })}
          </div>
          <p className={styles.sub_text__color}>〜Achievement rate〜</p>
          <div className={styles.sub_text__bottom}>
            {runTask}/{prevTaskList.length}
          </div>
          <Divider />
        </div>
      )}
      <TaskList
        onChange={inputTask}
        label={"〜Tomorrow-Task〜"}
        taskLength={taskLength}
        setTask={setTask}
        setTaskLength={setTaskLength}
        setTaskList={setNextTaskList}
        subText={"明日のタスクを書き出しましょう。"}
        task={task}
        taskList={nextTaskList}
      />
      <Divider />
      <h2 className={styles.main_title}>〜Scheduled to wake up〜</h2>
      <p className={styles.sub_title}>明日の起床予定時間を決めましょう。</p>
      <div className={styles.flex_center}>
        <SelectBox
          arr={hoursArr}
          label={"hour"}
          setState={setHours}
          state={hours}
          width={50}
        />
        <span className={styles.time_align}>:</span>
        <SelectBox
          arr={minutesArr}
          label={"minute"}
          setState={setMinutes}
          state={minutes}
          width={50}
        />
      </div>
      <div className={styles.small_space} />
      <Divider />
      <h2 className={styles.main_title}>〜Looking back〜</h2>
      <p className={styles.sub_title}>
        今日コミットしたことなど、コメントしましょう。
      </p>
      <TextArea
        defaultValue={lookingBackText}
        fullWidth={true}
        onChange={inputMessage}
        label={"message"}
        rows={4}
        value={lookingBackText}
      />
      <SecondButton
        fullWidth={true}
        label={"登録"}
        onClick={() => {
          dispatch(
            saveTomorrowCard(
              "night",
              checkedTask,
              date,
              hours,
              id,
              lookingBackText,
              minutes,
              nextTaskList,
              prevTaskList,
              runTask,
              uid,
              userIcon,
              username
            )
          );
        }}
      />
    </div>
  );
};

export default RegistTomorrowTask;
