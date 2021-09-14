import React from "react";
import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    dispaly: "block",
  },
});
export default function MessageSubmit() {
  const classes = useStyles();
  const history = useHistory();
  const [details, setDetails] = useState("");
  const [detailsError, setDetailsError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDetailsError(false);
    if (details == "") {
      setDetailsError(true);
    }
    if (details) {
      fetch("http://localhost:8000/notes", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({}),
      }).then(() => history.push("/"));
    }
  };

  return (
    <Container size="sm">
      <Typography
        variant="h4"
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        留下你對他的印象吧
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          onChange={(e) => setDetails(e.target.value)}
          label="我想對他說...."
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
        />

        <br />
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
