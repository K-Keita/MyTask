import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { signOut } from "../../reducks/users/operations";
import { getMyCard } from "../../reducks/cards/selectors";
import { getEnterGroupsId } from "../../reducks/users/selectors";
import { makeStyles } from "@material-ui/styles";
import cyan from "@material-ui/core/colors/cyan";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import styles from "../../public/styles/header/Header.module.scss";

const useStyles = makeStyles({
  drawerPaper: {
    width: 240,
    backgroundColor: cyan[50],
    color: cyan[900],
  },
  list_a: {
    padding: 4,
    backgroundColor: cyan[200],
  },
  list_b: {
    padding: 4,
    backgroundColor: cyan[300],
  },
  subList: {
    padding: 0,
    backgroundColor: cyan[200],
    color: cyan[700],
  },
});

const ClosableDrawer = React.memo((props) => {
  const classes = useStyles();
  const { container } = props;
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const enterGroups = getEnterGroupsId(selector),
    myCard = getMyCard(selector);

  const openClass = props.openGroupsList ? styles.block : styles.hidden;

  //ページ遷移処理
  const selectMenu = (event, path) => {
    dispatch(push(path));
    props.onClose(event);
  };

  //リンクによって、遷移先のリンク変更
  const registMorning = {
    func: selectMenu,
    label: "起床する",
    path: `/wakeup/${myCard.id}`,
  };
  const registNight = {
    func: selectMenu,
    label: "明日のカードを作成",
    path: "/regist/card",
  };
  const registMode = myCard.mode === "night" ? registMorning : registNight;

  const editMorning = {
    func: selectMenu,
    label: "今日のカードを編集",
    path: `/wakeup/${myCard.id}`,
  };
  const editNight = {
    func: selectMenu,
    label: "明日のカードを編集",
    path: `/regist/card/${myCard.id}`,
  };
  const editMode = myCard.mode === "morning" ? editMorning : editNight;

  //グループリストの開閉
  const toggleGroupsList = () => {
    props.setOpenGroupsList(!props.openGroupsList);
  };

  //サインアウト処理
  const signout = (event) => {
    dispatch(signOut());
    props.onClose(event);
  };

  //ユーザーの加入グループの情報取得
  // useEffect(() => {
  //   fetchGroups(uid);
  // }, [uid]);

  // //ユーザー情報を取得
  // useEffect(() => {
  //   fetchUsers(uid);
  // }, [uid]);

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawerPaper }}
      container={container}
      ModalProps={{ keepMounted: true }}
      open={props.open}
      onClose={(e) => props.onClose(e)}
      variant="temporary"
    >
      <div
        onClose={(e) => props.onClick(e)}
        onKeyDown={(e) => props.onClose(e)}
      >
        <List onClick={toggleGroupsList} className={classes.list_a}>
          <ListItem button key="group">
            <ListItemText primary={"グループリスト"} />
            <ListItemIcon>
              <ExpandMoreIcon fontSize="large" />
            </ListItemIcon>
          </ListItem>
        </List>
        <div className={openClass}>
          {enterGroups &&
            enterGroups.map((group, index) => {
              return (
                <List key={String(index)} className={classes.subList}>
                  <ListItem
                    button
                    key="group"
                    onClick={(e) => selectMenu(e, `/list/${group.id}`)}
                  >
                    <ListItemText primary={`・${group.name}`} />
                  </ListItem>
                </List>
              );
            })}
        </div>
        <Divider />
        <List className={classes.list_b}>
          <ListItem
            button
            key="group"
            onClick={(e) => selectMenu(e, "/create")}
          >
            <ListItemText primary={"新規グループ"} />
          </ListItem>
        </List>
        <Divider />
        <List className={classes.list_a}>
          <ListItem
            button
            key={registMode.label}
            onClick={(e) => registMode.func(e, registMode.path)}
          >
            <ListItemText primary={registMode.label} />
          </ListItem>
        </List>
        <Divider />
        <List className={classes.list_b}>
          <ListItem
            button
            key={editMode.label}
            onClick={(e) => editMode.func(e, editMode.path)}
          >
            <ListItemText primary={editMode.label} />
          </ListItem>
        </List>
        <Divider />
        <List className={classes.list_a}>
          <ListItem button key="info" onClick={(e) => selectMenu(e, "/edit")}>
            <ListItemText primary={"マイアカウント"} />
          </ListItem>
        </List>
        <Divider />
        <List className={classes.list_b}>
          <ListItem button key="logout" onClick={signout}>
            <ListItemText primary={"ログアウト"} />
          </ListItem>
        </List>
        <Divider />
      </div>
    </Drawer>
  );
});

export default ClosableDrawer;
