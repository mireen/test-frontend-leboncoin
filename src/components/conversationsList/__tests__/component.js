import { fireEvent, screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import React from "react";

import ConversationsList from "../component";

const defaultProps = {
  conversations: [
    {
      id: 1,
      lastMessageTimestamp: 1625637849,
      recipientId: 2,
      recipientNickname: "Jeremie",
      senderId: 1,
      senderNickname: "Thibaut",
    },
    {
      id: 2,
      lastMessageTimestamp: 1620284667,
      recipientId: 3,
      recipientNickname: "Patrick",
      senderId: 1,
      senderNickname: "Thibaut",
    },
  ],
  handleCreateNewConversation: jest.fn(),
  selectConversation: jest.fn(),
  selectedConversation: 0,
};

test("Should call handleCreateNewConversation when clicking on create new conversation button", () => {
  render(<ConversationsList {...defaultProps} />);

  const newConversationButton = screen.getByTestId("new-conversation-button");
  fireEvent.click(newConversationButton);

  expect(defaultProps.handleCreateNewConversation).toHaveBeenCalled();
});

test("Should render no conversation message when conversations is empty", () => {
  render(<ConversationsList {...defaultProps} conversations={[]} />);

  const noConversationMessage = screen.getByTestId("no-conversation-message");

  expect(noConversationMessage).toBeTruthy();
});

test("Should render conversations list when conversations is not empty", () => {
  render(<ConversationsList {...defaultProps} />);

  const conversationsList = screen.getByTestId("conversations-list");

  expect(conversationsList).toBeTruthy();
});

test("Should call selectConversation when clicking on listItem", () => {
  render(<ConversationsList {...defaultProps} />);

  const listItem = screen.getByTestId("conversations-list-0");
  fireEvent.click(listItem);

  expect(defaultProps.selectConversation).toHaveBeenCalled();
});
