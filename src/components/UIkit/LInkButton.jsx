import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import styles from "../../public/styles/UIkit/LinkButton.module.scss";

const LinkButton = (props) => {
  const dispatch = useDispatch();

  return (
    <div
      className={styles.link_button}
      onClick={() => dispatch(push(props.path))}
    >
      {props.label}
    </div>
  );
};

export default LinkButton;
