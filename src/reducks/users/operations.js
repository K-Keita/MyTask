import { signInAction, signOutAction } from "./actions";
import { auth, db, FirebaseTimestamp } from "../../firebase/index";
import { push } from "connected-react-router";
import { fetchUsersAction } from "./actions";
import { fetchMyCardInfo, fetchMyCard } from "../cards/operations";
import { resetCardAction } from "../cards/actions";

const usersRef = db.collection("users");

export const isValidEmailFormat = (email) => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return regex.test(email);
};

//グループ退会情報の登録
export const deleteUserGroup = (groupId, groupName, uid) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    usersRef
      .doc(uid)
      .get()
      .then((snapshot) => {
        const data = snapshot.data();

        const enterGroups = data.enterGroups;
        const deleteGroup = { name: groupName, id: groupId };

        const updatedGroups = [];
        enterGroups.map((group) => {
          if (group.id === deleteGroup.id && group.name === deleteGroup.name) {
            return false;
          }
          return updatedGroups.push(group);
        });

        const newData = {
          updated_at: timestamp,
          enterGroups: updatedGroups,
        };

        usersRef
          .doc(uid)
          .set(newData, { merge: true })
          .then(() => {
            dispatch(
              fetchUsersAction({
                enterGroups: updatedGroups,
                icon: data.icon,
                isSignIn: true,
                role: data.role,
                uid: data.uid,
                username: data.username,
              })
            );
            alert("指定したグループを退会しました");
          });
      });
  };
};

//匿名認証
export const anonymousSignIn = (username) => {
  return async (dispatch) => {
    if (username === "") {
      alert("必須項目が未入力です");
      return false;
    }
    const timestamp = FirebaseTimestamp.now();
    auth
      .signInAnonymously()
      .then(async (result) => {
        const user = result.user;
        const uid = user.uid;

        dispatch(
          signInAction({
            icon: "",
            isSignIn: true,
            role: "customer",
            uid: uid,
            username: username,
            enterGroups: [],
          })
        );

        const userInitialData = {
          created_at: timestamp,
          email: "",
          icon: "",
          role: "customer",
          uid: uid,
          updated_at: timestamp,
          username: username,
          enterGroups: [],
        };
        usersRef
          .doc(uid)
          .set(userInitialData)
          .then(() => {
            dispatch(push("/description/night"));
          });

        dispatch(fetchMyCardInfo(uid, username, ""));
      })
      .catch((error) => {
        throw Error(error);
      });
  };
};

//ユーザーの認証確認
export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        const uid = user.uid;

        const snapshot = await usersRef.doc(uid).get();
        const data = snapshot.data();
        if (data) {
          dispatch(
            signInAction({
              icon: data.icon,
              isSignIn: true,
              role: data.role,
              uid: uid,
              username: data.username,
              enterGroups: data.enterGroups,
            })
          );

          dispatch(fetchMyCardInfo(uid, data.username, data.icon));
          dispatch(fetchMyCard(uid));
        } 
      } else {
        dispatch(push("/home"));
      }
    });
  };
};

//パスワードリセット処理
export const resetPassword = (email) => {
  return async (dispatch) => {
    if (email === "") {
      alert("必須項目が未入力です");
      return false;
    } else if (!isValidEmailFormat(email)) {
      alert("メールアドレスの形式が不正です。");
      return false;
    }
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert(
          "入力されたアドレスにパスワードリセット用のメールをお送りしました。"
        );
        dispatch(push("/signin"));
      })
      .catch(() => {
        alert("パスワードリセットに失敗しました。通信状況をご確認ください");
      });
  };
};

//ユーザー情報の変更、登録
export const saveUserInfomation = (image, username, uid, enterGroups) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const newData = {
      username: username,
      icon: image,
      updated_at: timestamp,
    };

    console.log(enterGroups)

    return db
    .collection("users")
    .doc(uid)
    .set(newData, { merge: true })
    .then(() => {
      dispatch(fetchMyCardInfo(uid, username, image));
      dispatch(
        signInAction({
          icon: image,
          isSignIn: true,
          role: "customer",
          uid: uid,
          username: username,
          enterGroups: enterGroups,
        })
      );
        dispatch(push("/"));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

//グループ加入情報の登録
export const saveUserGroup = (groupId, groupName, uid) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();
    usersRef
      .doc(uid)
      .get()
      .then((snapshot) => {
        const data = snapshot.data();

        const enterGroups = data.enterGroups;
        enterGroups.push({ id: groupId, name: groupName });

        const newData = {
          updated_at: timestamp,
          enterGroups: enterGroups,
        };

        dispatch(
          fetchUsersAction({
            enterGroups: enterGroups,
            icon: data.icon,
            isSignIn: true,
            role: data.role,
            uid: data.uid,
            username: data.username,
          })
        );
        usersRef
          .doc(uid)
          .set(newData, { merge: true })
          .then(() => {
            console.log("enter");
          });
      });
  };
};

//サインイン処理
export const signIn = (email, password) => {
  return async (dispatch) => {
    if (email === "" || password === "") {
      alert("必須項目が未入力です");
      return false;
    }

    auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;

        usersRef
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();
            if (data) {
              dispatch(
                signInAction({
                  icon: data.icon,
                  isSignIn: true,
                  role: data.role,
                  uid: uid,
                  username: data.username,
                  enterGroups: data.enterGroups,
                })
              );
              dispatch(fetchMyCardInfo(uid, data.username, data.icon));

              dispatch(push("/"));
            }
          })
          .catch(() => {
            alert("メールアドレスとパスワードが一致しません");
            console.log(Error);
          });
      }
    });
  };
};

//サインアップ処理
export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("必須項目が未入力です");
      return false;
    }
    if (!isValidEmailFormat(email)) {
      alert("メールアドレスの形式が不正です。もう1度お試しください。");
      return false;
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう一度お試しください");
      return false;
    }

    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;

        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            created_at: timestamp,
            email: email,
            icon: "",
            role: "customer",
            uid: uid,
            updated_at: timestamp,
            username: username,
            enterGroups: [],
          };
          dispatch(fetchMyCardInfo(uid, username, ""));

          usersRef
            .doc(uid)
            .set(userInitialData)
            .then(() => {
              dispatch(push("/description/night"));
            });
        }
      });
  };
};

//サインアウト処理
export const signOut = () => {
  return async (dispatch) => {
    dispatch(resetCardAction());
    auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(push("/signin"));
    });
  };
};
