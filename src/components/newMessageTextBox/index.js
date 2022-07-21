import { func, string } from "prop-types";
import { Grid, Input, TextField } from "@mui/material";
import styles from "../../styles/NewMessageTextBox.module.css";
import SendIcon from "@mui/icons-material/Send";
import { isNotNilOrEmpty } from "ramda-adjunct";

export default function NewMessageTextBox({
  newMessage,
  setNewMessage,
  submitMessage,
}) {
  return (
    <Grid container className={styles.newMessageTextBoxContainer}>
      <Grid item>
        <TextField
          className={styles.chatTextBox}
          fullWidth
          inputProps={{ "data-testid": "new-message-input" }}
          onChange={({ target: { value } }) => setNewMessage(value)}
          placeholder="Ecrivez un message..."
        />
      </Grid>
      <Grid item className={styles.sendIcon}>
        <SendIcon
          data-testid="submit-message-button"
          onClick={() =>
            isNotNilOrEmpty(newMessage) && submitMessage(newMessage)
          }
        ></SendIcon>
      </Grid>
    </Grid>
  );
}

NewMessageTextBox.propTypes = {
  newMessage: string,
  setNewMessage: func,
  submitMessage: func,
};

NewMessageTextBox.defaultProps = {
  newMessage: "",
  setNewMessage: (f) => f,
  submitMessage: (f) => f,
};
