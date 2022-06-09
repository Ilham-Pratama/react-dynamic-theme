import React from "react";
import {
  Theme,
  UseTheme,
  CreateThemeArgs,
  ThemeProviderArgs,
  CreateTheme
} from "./type";

const createTheme = <T extends string, V>({
  initialTheme,
  themes
}: CreateThemeArgs<T, V>): CreateTheme<UseTheme<T, Theme<T, V>>> => {
  const ThemeContext = React.createContext<UseTheme<T, Theme<T, V>>>(
    {} as UseTheme<T, Theme<T, V>>
  );

  const ThemeProvider = ({ children }: ThemeProviderArgs) => {
    const [currentTheme, setCurrentTheme] = React.useState<T>(initialTheme);

    const getCurrentTheme = React.useCallback(() => {
      return {
        name: currentTheme,
        styles: themes[currentTheme]
      };
    }, [currentTheme]);

    return (
      <ThemeContext.Provider
        value={{
          setCurrentTheme,
          theme: getCurrentTheme()
        }}
      >
        {children}
      </ThemeContext.Provider>
    );
  };

  const useTheme = () => React.useContext(ThemeContext);

  return { ThemeProvider, ThemeConsumer: ThemeContext.Consumer, useTheme };
};

export default createTheme;
