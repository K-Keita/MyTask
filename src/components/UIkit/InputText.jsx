import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    width: "90%",
  },
}));

const InputText = (props) => {
  const classes = useStyles();

  const onFormSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <form onSubmit={onFormSubmit} className={classes.root} noValidate autoComplete="off">
      <TextField
        fullWidth={props.fullWidth}
        id={props.id}
        label={props.label}
        onChange={props.onChange}
        type={props.type}
        value={props.value}
      />
    </form>
  );
};

export default InputText;
