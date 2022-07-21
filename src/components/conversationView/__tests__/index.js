import { fireEvent, screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import React from "react";

import ConversationView from "../";

const defaultProps = {
  messages: [
    {
      authorId: 1,
      body: "Bonjour c'est le premier message de la première conversation",
      conversationId: 1,
      id: 1,
      timestamp: 1625637849,
    },
    {
      authorId: 1,
      body: "Bonjour c'est le second message de la première conversation",
      conversationId: 1,
      id: 2,
      timestamp: 1625637867,
    },
  ],
};

test("Should render no message when messages is empty", () => {
  render(<ConversationView messages={[]} />);

  const noMessage = screen.getByTestId("no-message");

  expect(noMessage).toBeTruthy();
});

test("Should render messages list when messages is not empty", () => {
  render(<ConversationView {...defaultProps} />);

  const messagesList = screen.getByTestId("messages-list");

  expect(messagesList).toBeTruthy();
});
