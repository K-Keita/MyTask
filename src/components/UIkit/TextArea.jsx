import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  root: {
    margin: "10px 0",
  },
});

const TextArea = (props) => {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        fullWidth={props.fullWidth}
        id="message-area"
        label={props.label}
        multiline
        onChange={props.onChange}
        rows={props.rows}
        style={{ backgroundColor: "mintcream" }}
        value={props.value}
        variant="outlined"
      />
    </form>
  );
};

export default TextArea;
