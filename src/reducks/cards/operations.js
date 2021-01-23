import { db, FirebaseTimestamp } from "../../firebase/index";
import { fetchCardsAction, fetchMyCardAction } from "./actions";
import { push } from "connected-react-router";

const usersRef = db.collection("users");

//自身のカード情報取得
export const fetchMyCard = (uid) => {
  const id = String(uid);
  return async (dispatch) => {
    const snapshot = await usersRef
      .doc(id)
      .collection("cards")
      .orderBy("created_at", "desc")
      .limit(1)
      .get();

    const cardsList = [];
    if (!snapshot.exists) {
      dispatch(
        fetchMyCardAction({
          id: "",
        })
      );
    }
    snapshot.forEach((doc) => {
      const card = doc.data();
      cardsList.push(card);
    });

    const card = cardsList[0];

    dispatch(fetchMyCardAction(card));
  };
};

//カード情報の変更
export const fetchMyCardInfo = (uid, username, icon) => {
  const id = String(uid);
  return async (dispatch) => {
    const snapshot = await usersRef
      .doc(id)
      .collection("cards")
      .orderBy("created_at", "desc")
      .limit(1)
      .get();

    snapshot.forEach((doc) => {
      const card = doc.data();
      const cardId = card.id;
      const data = {
        username: username,
        icon: icon,
      };
      card.username = username;
      card.icon = icon;

      usersRef
        .doc(id)
        .collection("cards")
        .doc(cardId)
        .set(data, { merge: true })
        .then(() => {
          dispatch(fetchMyCardAction(card));
        });
    });
  };
};

//グループ内のそれぞれのカード情報を取得
export const fetchCards = (groupUser) => {
  return async (dispatch) => {
    const cardsList = [];
    groupUser.forEach(async (id) => {
      const snapshot = await usersRef
        .doc(id)
        .collection("cards")
        .orderBy("created_at", "desc")
        .limit(1)
        .get();

      snapshot.forEach((doc) => {
        const card = doc.data();

        cardsList.push(card);
      });

      dispatch(fetchCardsAction(cardsList));
    });
  };
};

//今日のカード情報の登録、変更
export const saveTodayCard = (
  mode,
  enthusiasmText,
  id,
  nextTaskList,
  uid,
  wakeupTime
) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const data = {
      enthusiasmText: enthusiasmText,
      mode: mode,
      nextTaskList: nextTaskList,
      updated_at: timestamp,
      wakeupTime: wakeupTime,
    };

    if (id === "") {
      const ref = usersRef.doc(uid).collection("cards").doc();
      data.created_at = timestamp;
      id = ref.id;
      data.id = id;
    }

    return db
      .collection("users")
      .doc(uid)
      .collection("cards")
      .doc(id)
      .set(data, { merge: true })
      .then(() => {
        dispatch(push("/"));
        dispatch(fetchMyCardAction(data));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

//明日のカード情報の登録、変更
export const saveTomorrowCard = (
  mode,
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
) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const data = {
      checkedTask: checkedTask,
      date: date,
      hours: hours,
      icon: userIcon,
      lookingBackText: lookingBackText,
      minutes: minutes,
      mode: mode,
      nextTaskList: nextTaskList,
      runTask: runTask,
      prevTaskList: prevTaskList,
      prevTaskNum: prevTaskList.length,
      updated_at: timestamp,
      username: username,
    };

    if (id === "") {
      const ref = usersRef.doc(uid).collection("cards").doc();
      data.created_at = timestamp;
      id = ref.id;
      data.id = id;
    }

    return usersRef
      .doc(uid)
      .collection("cards")
      .doc(id)
      .set(data, { merge: true })
      .then(() => {
        dispatch(fetchMyCardAction(data));
        dispatch(push("/"));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
