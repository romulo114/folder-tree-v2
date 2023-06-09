import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders root directory name", () => {
  render(<App />);
  const rootParagraphElement = screen.getByLabelText("root-name");
  expect(rootParagraphElement.textContent).toBe("root");
});

test("only renders the files in the root directory at first", () => {
  render(<App />);
  expect(screen.getAllByLabelText(/file-row/i)).toHaveLength(6);
});

test("expands/collapses when src directory is clicked", async () => {
  render(<App />);
  // before click
  expect(screen.getAllByLabelText(/file-row/i)).toHaveLength(6);
  await userEvent.click(screen.getByLabelText(/src-file-row/i));
  // after click
  expect(screen.getAllByLabelText(/file-row/i)).toHaveLength(11);
  await userEvent.click(screen.getByLabelText(/src-file-row/i));
  // after two-clicks
  expect(screen.getAllByLabelText(/file-row/i)).toHaveLength(6);
});

test("expands when src/components directory is clicked", async () => {
  render(<App />);
  await userEvent.click(screen.getByLabelText(/src-file-row/i));
  await userEvent.click(screen.getByLabelText(/components-file-row/i));
  expect(screen.getAllByLabelText(/file-row/i)).toHaveLength(12);
});