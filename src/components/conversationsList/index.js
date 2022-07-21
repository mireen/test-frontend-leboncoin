import { func } from "prop-types";
import ConversationsList from "./component";

export default function ConversationsListContainer({
  getMessages,
  setSelectedConversation,
  ...rest
}) {
  const selectConversation = (index) => {
    setSelectedConversation(index);
    getMessages(index + 1);
  };

  return (
    <ConversationsList {...rest} selectConversation={selectConversation} />
  );
}

ConversationsListContainer.propTypes = {
  getMessages: func,
  setSelectedConversation: func,
};

ConversationsListContainer.defaultProps = {
  getMessages: (f) => f,
  setSelectedConversation: (f) => f,
};
