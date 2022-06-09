import "@testing-library/jest-dom";
import React from "react";
import { fireEvent, render, RenderResult } from "@testing-library/react";
import { createTheme } from "../src";
import { DefaultThemeStyle } from "../src/type";

describe("createTheme", () => {
  const { ThemeProvider, ThemeConsumer, useTheme } = createTheme<
    "normal" | "dark",
    DefaultThemeStyle
  >({
    initialTheme: "normal",
    themes: {
      normal: {
        background: "white",
        text: "black"
      },
      dark: {
        background: "black",
        text: "white"
      }
    }
  });

  const AppWithUseTheme = () => {
    const { setCurrentTheme, theme } = useTheme();

    const changeTheme = () =>
      setCurrentTheme((current) => (current === "normal" ? "dark" : "normal"));

    return (
      <div>
        <button
          type="button"
          role="button"
          onClick={changeTheme}
        >
          Change Theme
        </button>
        <p data-testid="theme">{theme.name}</p>
        <p data-testid="background">{theme.styles.background}</p>
        <p data-testid="text">{theme.styles.text}</p>
      </div>
    );
  };

  const AppWithThemeConsumer = () => {
    return (
      <ThemeConsumer>
        {({ setCurrentTheme, theme }) => (
          <>
            <button
              type="button"
              role="button"
              onClick={() => setCurrentTheme("dark")}
            >
              Change Theme
            </button>
            <p data-testid="theme">{theme.name}</p>
            <p data-testid="background">{theme.styles.background}</p>
            <p data-testid="text">{theme.styles.text}</p>
          </>
        )}
      </ThemeConsumer>
    );
  };

  const assertComponent = (
    component: RenderResult<
      typeof import("c:/Open-source/react-dynamic-theme/node_modules/@testing-library/dom/types/queries"),
      HTMLElement
    >
  ) => {
    expect(component).toMatchSnapshot();

    expect(component.getByTestId("theme")).toHaveTextContent("normal");
    expect(component.getByTestId("background")).toHaveTextContent("white");
    expect(component.getByTestId("text")).toHaveTextContent("black");

    fireEvent.click(component.getByRole("button"));

    expect(component.getByTestId("theme")).toHaveTextContent("dark");
    expect(component.getByTestId("background")).toHaveTextContent("black");
    expect(component.getByTestId("text")).toHaveTextContent("white");
  };

  it("renders themed component and updates the theme with useTheme", () => {
    const component = render(
      <ThemeProvider>
        <AppWithUseTheme />
      </ThemeProvider>
    );

    assertComponent(component);
  });

  it("renders themed component and updates the theme with ThemeConsumer", () => {
    const component = render(
      <ThemeProvider>
        <AppWithThemeConsumer />
      </ThemeProvider>
    );

    assertComponent(component);
  });
});
