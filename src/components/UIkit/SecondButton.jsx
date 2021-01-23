import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    margin: "20px auto",
    maxWidth: 360,
    width: "70%",
  },
});

const SecondButton = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        fullWidth={props.fullWidth}
        onClick={props.onClick}
        variant="outlined"
      >
        {props.label}
      </Button>
    </div>
  );
};

export default SecondButton;
