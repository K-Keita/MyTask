import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  enterGroup,
  createGroup,
  exitGroup,
} from "../reducks/groups/operations";
import { getUserId } from "../reducks/users/selectors";
import { InputText, SecondButton } from "../components/UIkit";
import Divider from "@material-ui/core/Divider";
import styles from "../public/styles/registration/Registration.module.scss";

const CreateGroup = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);

  const [createGroupName, setCreateGroupName] = useState(""),
    [createGroupId, setCreateGroupId] = useState(""),
    [enterGroupName, setEnterGroupName] = useState(""),
    [enterGroupId, setEnterGroupId] = useState(""),
    [exitGroupName, setExitGroupName] = useState(""),
    [exitGroupId, setExitGroupId] = useState("");

  const inputCreateGroupName = useCallback(
    (event) => {
      setCreateGroupName(event.target.value);
    },
    [setCreateGroupName]
  );

  const inputCreateGroupId = useCallback(
    (event) => {
      setCreateGroupId(event.target.value);
    },
    [setCreateGroupId]
  );

  const inputEnteGroupName = useCallback(
    (event) => {
      setEnterGroupName(event.target.value);
    },
    [setEnterGroupName]
  );

  const inputEnteGroupId = useCallback(
    (event) => {
      setEnterGroupId(event.target.value);
    },
    [setEnterGroupId]
  );

  const inputExitGroupName = useCallback(
    (event) => {
      setExitGroupName(event.target.value);
    },
    [setExitGroupName]
  );

  const inputExitGroupId = useCallback(
    (event) => {
      setExitGroupId(event.target.value);
    },
    [setExitGroupId]
  );

  return (
    <div className={styles.main_container}>
      <h2 className={styles.main_title}>〜Creating a group〜</h2>
      <p className={styles.sub_title}>グループの作成</p>
      <InputText
        fullWidth={true}
        label={"groupName"}
        onChange={inputCreateGroupName}
        type={"text"}
        value={createGroupName}
      />
      <InputText
        fullWidth={true}
        label={"groupId"}
        onChange={inputCreateGroupId}
        type={"text"}
        value={createGroupId}
      />
      <SecondButton
        fullWidth={true}
        label={"作成"}
        onClick={() =>
          dispatch(createGroup(createGroupName, createGroupId, uid))
        }
      />
      <div className={styles.small_space} />
      <Divider />
      <h2 className={styles.main_title}>〜Join the group〜</h2>
      <p className={styles.sub_title}>グループに参加</p>
      <InputText
        fullWidth={true}
        label={"groupName"}
        onChange={inputEnteGroupName}
        type={"text"}
        value={enterGroupName}
      />
      <InputText
        fullWidth={true}
        label={"groupId"}
        onChange={inputEnteGroupId}
        type={"text"}
        value={enterGroupId}
      />
      <SecondButton
        fullWidth={true}
        label={"参加"}
        onClick={() => dispatch(enterGroup(enterGroupName, enterGroupId, uid))}
      />
      <div className={styles.small_space} />
      <Divider />
      <h2 className={styles.main_title}>〜Leave the group〜</h2>
      <p className={styles.sub_title}>グループを退会</p>
      <InputText
        fullWidth={true}
        label={"groupName"}
        onChange={inputExitGroupName}
        type={"text"}
        value={exitGroupName}
      />
      <InputText
        fullWidth={true}
        label={"groupId"}
        onChange={inputExitGroupId}
        type={"text"}
        value={exitGroupId}
      />
      <SecondButton
        fullWidth={true}
        label={"退会"}
        onClick={() => dispatch(exitGroup(exitGroupId, exitGroupName, uid))}
      />
      <div className={styles.medium_space} />
    </div>
  );
};

export default CreateGroup;
