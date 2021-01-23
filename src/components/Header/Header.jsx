import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { ClosableDrawer } from "./index";
import { exitGroup } from "../../reducks/groups/operations";
import { getGroupName, getGroupId } from "../../reducks/groups/selectors";
import { getIsSignedIn, getUserId } from "../../reducks/users/selectors";
import { getMyCard } from "../../reducks/cards/selectors";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import cyan from "@material-ui/core/colors/cyan";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SecondBar from "./SecondBar";
import Toolbar from "@material-ui/core/Toolbar";
import styles from "../../public/styles/header/Header.module.scss";

const useStyles = makeStyles((theme) => ({
  mainColor: {
    backgroundColor: cyan[600],
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
  },
  toolbar: {
    margin: "0 auto",
    width: "90%",
  },
}));

const d = new Date();
const month = d.getMonth() + 1;
const day = d.getDate();
const date = `${month}/${day}`;

const Header = () => {
  let id = window.location.pathname;
  const classes = useStyles();

  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const groupId = getGroupId(selector),
    groupName = getGroupName(selector),
    isSignedIn = getIsSignedIn(selector),
    myCard = getMyCard(selector),
    uid = getUserId(selector);

  const [openDrawer, setOpenDrawer] = useState(false),
    [openGroupsList, setOpenGroupsList] = useState(false),
    [title, setTitle] = useState("");

  useEffect(() => {
    switch (id) {
      case "/" || "":
        setTitle("HOME");
        break;
      case "/create":
        setTitle("グループの作成、参加");
        break;
      case "/description/morning":
        setTitle("使い方");
        break;
      case "/description/night":
        setTitle("使い方");
        break;
      case "/description/groups":
        setTitle("使い方");
        break;
      case "/edit":
        setTitle("マイアカウント");
        break;
      case "/regist/card":
        setTitle("カードの作成");
        break;
      case `/regist/card/${myCard.id}`:
        setTitle("カードの編集");
        break;
      case `/list/${groupId}`:
        setTitle(groupName);
        break;
      case `/wakeup/${myCard.id}`:
        setTitle("タスクの確認、編集");
        break;
      default:
        setTitle("");
        break;
    }
  }, [id, groupName, groupId, myCard.id]);

  const exit = useCallback(() => {
    if (window.confirm("このグループを退会します。本当によろしいですか？")) {
      dispatch(exitGroup(groupName, groupId, uid));
    }
  }, [dispatch, groupName, groupId, uid]);

  const help = useCallback(() => {
    dispatch(push("/description/night"));
  }, [dispatch]);

  //キー入力時、Drawerの閉処理
  const handleDrawerToggle = useCallback(
    (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setOpenDrawer(!openDrawer);
      setOpenGroupsList(false);
    },
    [setOpenDrawer, openDrawer, setOpenGroupsList]
  );

  //カードの切り替え処理
  const changeMode = () => {
    if (myCard.mode === "morning") {
      if (window.confirm("カードの切り替えを行いますか？")) {
        dispatch(push("/regist/card"));
      }
    } else if (myCard.mode === "night") {
      if (window.confirm("カードの切り替えを行いますか？")) {
        dispatch(push(`/wakeup/${myCard.id}`));
      }
    }
  };

  return (
    <div className={styles.head_position}>
      <div className={classes.root}>
        <AppBar position="static" className={classes.mainColor}>
          <Toolbar className={classes.toolbar}>
            <ClosableDrawer
              onClose={handleDrawerToggle}
              open={openDrawer}
              openGroupsList={openGroupsList}
              setOpenGroupsList={setOpenGroupsList}
            />
            {isSignedIn && (
              <IconButton
                aria-label="open drawer"
                className={classes.menuButton}
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            )}
            <div
              onClick={() => dispatch(push("/"))}
              style={{ cursor: "pointer" }}
            >
              <h1 className={styles.head_title}>MyTask</h1>
            </div>
            <div className={styles.c_left}>
              <h2 style={{ color: "#e0f7fa" }}>{date}</h2>
            </div>
          </Toolbar>
        </AppBar>
        <SecondBar
          changeMode={changeMode}
          exit={exit}
          help={help}
          title={title}
          groupName={groupName}
        />
      </div>
    </div>
  );
};

export default Header;
