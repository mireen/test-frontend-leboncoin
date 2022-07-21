import { func } from "prop-types";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import NewConversation from "./component";
import { loggedUserId } from "../../pages/_app";

export default function NewConversationContainer({
  getConversations,
  setOpenNewConversationDialog,
  setOpenSnackbarError,
  setSelectedConversation,
  submitMessage,
  ...rest
}) {
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  const getUsers = useCallback(() => {
    axios
      .get(`http://localhost:3005/users`)
      .then(function ({ data }) {
        setUsers(data);
      })
      .catch(function () {
        setOpenSnackbarError(true);
      });
  }, [setOpenSnackbarError]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const createNewConversation = () => {
    axios
      .post(`http://localhost:3005/conversations/${loggedUserId}`, {
        recipientId: user.id,
        recipientNickname: user.nickname,
        senderId: loggedUserId,
        senderNickname: "Thibaut",
        lastMessageTimestamp: new Date().getTime(),
      })
      .then(function ({ data: { id } }) {
        setSelectedConversation(id);
        setOpenNewConversationDialog(false);
        getConversations();
        submitMessage(message);
      })
      .catch(function () {
        setOpenSnackbarError(true);
      });
  };

  return (
    <NewConversation
      createNewConversation={createNewConversation}
      setMessage={setMessage}
      setOpenNewConversationDialog={setOpenNewConversationDialog}
      setUser={setUser}
      users={users}
      {...rest}
    />
  );
}

NewConversationContainer.propTypes = {
  getConversations: func,
  setOpenNewConversationDialog: func,
  setOpenSnackbarError: func,
  setSelectedConversation: func,
  submitMessage: func,
};

NewConversationContainer.defaultProps = {
  getConversations: (f) => f,
  setOpenNewConversationDialog: (f) => f,
  setOpenSnackbarError: (f) => f,
  setSelectedConversation: (f) => f,
  submitMessage: (f) => f,
};
