import { arrayOf, func, number, shape } from "prop-types";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { isNilOrEmpty } from "ramda-adjunct";

import styles from "../../styles/ConversationsList.module.css";

export default function ConversationsListComponent({
  conversations,
  handleCreateNewConversation,
  selectConversation,
  selectedConversation,
}) {
  return (
    <>
      <Grid item textAlign="center">
        <Button
          className={styles.newConversationButton}
          data-testid="new-conversation-button"
          onClick={handleCreateNewConversation}
          variant="contained"
        >
          Nouveau message
        </Button>
      </Grid>
      <Grid item>
        {isNilOrEmpty(conversations) ? (
          <Typography data-testid="no-conversation-message">
            Aucune conversation
          </Typography>
        ) : (
          <>
            <List
              className={styles.listContainer}
              data-testid="conversations-list"
            >
              {conversations.map((conversation, index) => (
                <ListItem
                  alignItems="flex-start"
                  data-testid={`conversations-list-${index}`}
                  key={index}
                  onClick={() => {
                    selectConversation(index);
                  }}
                  selected={selectedConversation === index}
                >
                  <ListItemAvatar>
                    <Avatar alt="Avatar">
                      {conversation?.recipientNickname.split("")[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={conversation?.recipientNickname}
                    secondary={
                      <>
                        <Typography color="textPrimary" component="span">
                          {new Date(
                            conversation?.lastMessageTimestamp
                          ).toDateString()}
                        </Typography>
                      </>
                    }
                  ></ListItemText>
                </ListItem>
              ))}
            </List>
            <Divider />
          </>
        )}
      </Grid>
    </>
  );
}

ConversationsListComponent.propTypes = {
  conversations: arrayOf(shape({})),
  handleCreateNewConversation: func,
  selectConversation: func,
  selectedConversation: number,
};

ConversationsListComponent.defaultProps = {
  conversations: [],
  handleCreateNewConversation: (f) => f,
  selectConversation: (f) => f,
  selectedConversation: null,
};
