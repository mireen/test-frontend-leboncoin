import { fireEvent, getByText, screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import React from "react";

import NewConversation from "../component";

const defaultProps = {
  createNewConversation: jest.fn(),
  openNewConversationDialog: true,
  setMessage: jest.fn(),
  setOpenNewConversationDialog: jest.fn(),
  setUser: jest.fn(),
  user: {
    id: 1,
    nickname: "Thibaut",
    token: "xxxx",
  },
  users: [
    {
      id: 1,
      nickname: "Thibaut",
      token: "xxxx",
    },
    {
      id: 2,
      nickname: "Jeremie",
      token: "xxxx",
    },
    {
      id: 3,
      nickname: "Patrick",
      token: "xxxx",
    },
  ],
};

test("Should call createNewConversation when clicking on submit button", () => {
  render(<NewConversation {...defaultProps} />);

  const createNewConversationButton = screen.getByTestId(
    "create-new-conversation-button"
  );
  fireEvent.click(createNewConversationButton);

  expect(defaultProps.createNewConversation).toHaveBeenCalled();
});

/* test("Should change user input value", () => {
  render(<NewConversation {...defaultProps} />);

  const value = {
    id: 2,
    nickname: "Jeremie",
    token: "xxxx",
  };
  const userInput = screen.getByTestId("select-user-input");
  fireEvent.change(userInput, {
    target: {
      value,
    },
  });

  expect(userInput.value).toEqual(value);
}); */

test("Should change message input value", () => {
  render(<NewConversation {...defaultProps} />);

  const value = "Message ici";
  const messageInput = screen.getByTestId("new-message-input");

  fireEvent.change(messageInput, {
    target: {
      value,
    },
  });

  expect(messageInput.value).toBe(value);
});
