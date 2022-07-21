import { fireEvent, screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import React from "react";

import NewMessageTextBox from "../";

const defaultProps = {
  newMessage: "",
  setNewMessage: jest.fn(),
  submitMessage: jest.fn(),
};

test("Should change message input value", () => {
  render(<NewMessageTextBox {...defaultProps} />);

  const value = "Nouveau message";
  const messageInput = screen.getByTestId("new-message-input");
  fireEvent.change(messageInput, {
    target: {
      value,
    },
  });

  expect(messageInput.value).toBe(value);
});

test("Should call submitMessage when clicking on submit button", () => {
  const newMessage = "Nouveau message !";
  render(<NewMessageTextBox {...defaultProps} newMessage={newMessage} />);

  const submitButton = screen.getByTestId("submit-message-button");
  fireEvent.click(submitButton);

  expect(defaultProps.submitMessage).toHaveBeenCalledWith(newMessage);
});
