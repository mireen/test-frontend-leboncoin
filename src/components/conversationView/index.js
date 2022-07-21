import { Grid, Typography } from "@mui/material";
import { arrayOf, shape } from "prop-types";
import { isNilOrEmpty } from "ramda-adjunct";

import styles from "../../styles/ConversationView.module.css";

export default function ConversationView({ messages }) {
  if (isNilOrEmpty(messages))
    return (
      <Grid container height="100%">
        <Grid className={styles.noMessageContainer} item>
          <Typography data-testid="no-message">Aucun message</Typography>
        </Grid>
      </Grid>
    );

  return (
    <div data-testid="messages-list">
      {messages.map((message, index) => (
        <div
          key={index}
          className={
            message.authorId === 1 ? styles.userSent : styles.friendSent
          }
        >
          {message.body}
        </div>
      ))}
    </div>
  );
}

ConversationView.propTypes = {
  messages: arrayOf(shape),
};

ConversationView.defaultProps = {
  messages: [],
};
