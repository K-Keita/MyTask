import { db, FirebaseTimestamp } from "../../firebase/index";
import { fetchGroupsAction, fetchGroupCardsListAction } from "./actions";
import { saveUserGroup, deleteUserGroup } from "../users/operations";
import { push } from "connected-react-router";

const groupsRef = db.collection("groups");

//グループ作成処理
export const createGroup = (groupName, groupId, uid) => {
  return async (dispatch) => {
    const doc = await groupsRef.doc(groupId).get();

    if (doc.exists) {
      alert("IDが既に存在しています。ほかのIDを指定してください");
      return false;
    }
    const timestamp = FirebaseTimestamp.now();

    const data = {
      created_at: timestamp,
      groupName: groupName,
      groupId: groupId,
      createdUser: uid,
      users: [uid],
    };

    groupsRef
      .doc(groupId)
      .set(data)
      .then(() => {
        dispatch(saveUserGroup(groupId, groupName, uid));
        dispatch(push(`/list/${groupId}`));
      });
  };
};

//グループ加入処理
export const enterGroup = (groupName, groupId, uid) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const doc = await groupsRef.doc(groupId).get();

    if (doc == null || !doc.exists) {
      alert("グループ名とIDが一致しません");
      return false;
    }

    const data = doc.data();

    if (groupName !== data.groupName) {
      alert("グループ名とIDが一致しません");
      return false;
    }
    const users = data.users;

    if (users.includes(uid)) {
      alert("既にグループに入っています");
      return false;
    }
    users.push(uid);

    const newData = {
      users: users,
      updated_at: timestamp,
    };

    groupsRef
      .doc(groupId)
      .set(newData, { merge: true })
      .then(() => {
        dispatch(saveUserGroup(groupId, groupName, uid));
        dispatch(push(`/list/${groupId}`));
      });
  };
};

//グループ退会処理
export const exitGroup = (groupName, groupId, uid) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const doc = await groupsRef.doc(groupId).get();

    if (doc == null || !doc.exists) {
      alert("グループ名とIDが一致しません");
      return false;
    }
    const data = doc.data();

    if (groupName !== data.groupName) {
      alert("グループ名とIDが一致しません");
      return false;
    }
    const users = data.users;

    if (users.indexOf(uid) === -1) {
      alert("グループに入っていません");
    }

    const updatedUsers = users.filter((user) => user !== uid);

    const newData = {
      users: updatedUsers,
      updated_at: timestamp,
    };

    groupsRef
      .doc(groupId)
      .set(newData, { merge: true })
      .then(() => {
        dispatch(deleteUserGroup(groupId, groupName, uid));
        dispatch(push("/"));
      });
  };
};

//ユーザーが加入しているグループの情報取得
export const fetchGroups = (uid) => {
  return async (dispatch) => {
    const snapshot = await db
      .collection("groups")
      .where("users", "array-contains", uid)
      .get();
    const groupsList = [];
    snapshot.forEach((doc) => {
      const groups = doc.data();

      groupsList.push(groups);
    });

    dispatch(fetchGroupsAction(groupsList));
  };
};

//指定グループの情報取得
export const fetchGroupCardsList = (groupId, uid) => {
  const id = String(groupId);
  return async (dispatch) => {
    const doc = await groupsRef.doc(id).get();
    const card = doc.data();
    const users = card.users;

    if (!users.includes(uid)) {
      console.log("notEntry");
      return false;
    }

    dispatch(fetchGroupCardsListAction(card));
  };
};
