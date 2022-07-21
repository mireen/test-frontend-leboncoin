import { render } from "@testing-library/react";
import React from "react";

import ConversationsListContainer from "../";

const defaultProps = {
  getMessages: jest.fn(),
  setSelectedConversation: jest.fn(),
};

const mockChildComponent = jest.fn();
// eslint-disable-next-line react/display-name
jest.mock("../component", () => (props) => {
  mockChildComponent(props);
  return <mock-childComponent />;
});

test("Should render Conversations list component", () => {
  render(<ConversationsListContainer {...defaultProps} />);

  expect(mockChildComponent).toHaveBeenCalled();
});
