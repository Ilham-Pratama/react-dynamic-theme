export interface Theme<T extends string, V> {
  name: T;
  styles: V;
}

export interface UseTheme<T, V> {
  setCurrentTheme: (arg: T | ((thisArg: T) => T)) => void;
  theme: V;
}

export interface DefaultThemeStyle {
  primary?: string;
  secondary?: string;
  paper?: string;
  background?: string;
  text?: string;
  border?: string;
  notification?: string;
  "spacing-1"?: string | number;
  "spacing-2"?: string | number;
  "spacing-3"?: string | number;
  "spacing-4"?: string | number;
}

export interface CreateThemeArgs<T extends string, V> {
  /**
   * Initial theme name
   *
   * @param
   */
  initialTheme: T;

  /**
   * Theme styles list
   *
   * @param
   */
  themes: Record<T, V>;
}

export interface ThemeProviderArgs {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}

export interface CreateTheme<T> {
  /**
   * Wrap the component that you want to apply the theme to.
   * Make sure to do it first before using the themes.
   *
   * @instance
   */
  ThemeProvider: ({ children }: ThemeProviderArgs) => JSX.Element;

  /**
   * Theme consumer that works best to quickly apply your theme styles.
   *
   * @instance
   */
  ThemeConsumer: React.Consumer<T>;

  /**
   * Custom hook to read and update your theme
   *
   * @instance
   */
  useTheme: () => T;
}
