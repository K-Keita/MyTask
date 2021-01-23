import React from "react";
import { InputText } from "../UIkit";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import styles from "../../public/styles/registration/Registration.module.scss";

const useStyles = makeStyles({
  icon: {
    fontSize: "large",
    height: 48,
    margin: "12px auto 0 -30px",
    width: 48,
  },
});

const TaskList = (props) => {
  const classes = useStyles();

  //タスクの追加処理
  const addTask = (task, taskList) => {
    if (taskList.length === 6) {
      alert("タスクは６つまでです");
      return false;
    }
    if (task === "") {
      alert("タスクが未記入です");
      return false;
    }
    if (taskList.indexOf(task) !== -1) {
      alert("既に同名のタスクがあります");
      return false;
    }
    const newList = taskList;
    newList.push(task);
    props.setTaskList(newList);

    const added = "";
    props.setTask(added);
  };

  // タスクの削除処理
  const deleteTask = (index) => {
    const newList = props.taskList;
    newList.splice(index, 1);
    props.setTaskList(newList);
    props.setTaskLength(props.taskLength + 1);
  };

  return (
    <>
      <h2 className={styles.main_title}>{props.label}</h2>
      <p className={styles.sub_title}>{props.subText}</p>
      {props.taskList.map((task, index) => {
        return (
          <div className={styles.task_box__center} key={index}>
            <p>{`${index + 1}: ${task}`}</p>
            <IconButton
              onClick={() => {
                deleteTask(index);
              }}
            >
              <HighlightOffIcon />
            </IconButton>
          </div>
        );
      })}
      <p className={styles.sub_text__color}>〜Regist Task〜</p>
      <div className={styles.m_center__flex}>
        <div className={styles.m_center}>
          <InputText
            label={"newTask"}
            fullWidth={true}
            type={"text"}
            value={props.task}
            onChange={props.onChange}
          />
        </div>
        <IconButton
          className={classes.icon}
          onClick={() => {
            addTask(props.task, props.taskList);
          }}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </div>
    </>
  );
};

export default TaskList;
