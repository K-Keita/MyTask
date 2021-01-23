import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import cyan from "@material-ui/core/colors/cyan";

const useStyles = makeStyles({
  color: {
    color: cyan[400],
  },
});

const CheckBox = React.memo((props) => {
  const classes = useStyles();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (props.checkedTask.includes(props.task)) {
      setChecked(true);
    }
  }, [props.checkedTask, props.task]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (!checked) {
      props.setRunTask(props.runTask + 1);

      const checkedArr = props.checkedTask;
      checkedArr.push(props.task);
      props.setCheckedTask(checkedArr);
    } else {
      props.setRunTask(props.runTask - 1);

      const checkedArr = props.checkedTask;
      const newCheckedArr = checkedArr.filter((value) => value !== props.task);
      props.setCheckedTask(newCheckedArr);
    }
  };

  return (
    <>
      <p>
        {props.index + 1}: {props.task}
      </p>
      <Checkbox
        checked={checked}
        color="default"
        className={classes.color}
        inputProps={{ "aria-label": "secondary checkbox" }}
        onChange={handleChange}
      />
    </>
  );
});

export default CheckBox;
