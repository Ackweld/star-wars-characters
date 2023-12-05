import {
  render,
  screen,
  waitForElementToBeRemoved,
  fireEvent,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CharacterListView } from ".";

jest.mock("../../services/ApiService", () => ({
  ApiService: {
    getCharacters: jest.fn(() =>
      Promise.resolve({
        count: 20,
        results: [
          { name: "Character 1", url: "https://swapi.dev/api/people/1/" },
          { name: "Character 2", url: "https://swapi.dev/api/people/2/" },
        ],
      })
    ),
  },
}));

test("renders character list and handles navigation", async () => {
  render(
    <MemoryRouter>
      <CharacterListView />
    </MemoryRouter>
  );

  await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

  expect(screen.getByText("STAR WARS CHARACTERS")).toBeInTheDocument();

  expect(screen.getByText("Previous")).toBeInTheDocument();
  expect(screen.getByText("Next")).toBeInTheDocument();

  // Click the "Next" button
  fireEvent.click(screen.getByText("Next"));

  // Wait for the loading indicator to be removed after clicking "Next"
  await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

  fireEvent.click(screen.getByText("Previous"));

  await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
});
