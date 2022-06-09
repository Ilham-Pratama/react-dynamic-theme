# react-dynamic-theme

**react-dynamic-theme** is a lightweight theme management library for React.
This library helps you achieve theming for your react app with zero hassle in no time.

## 🖥️ Example

Here is a simple example on how to quickly setup your theme with **react-dynamic-theme**.

`./theme.js`

```js
import { createTheme } from "react-dynamic-theme";

const { ThemeProvider, ThemeConsumer, useTheme } = createTheme({
  initialTheme: "normal",

  /* All theme styles list */
  themes: {
    normal: {
      background: "#F4F4F4",
      text: "#1C1C1C"
    },
    dark: {
      background: "#1C1C1C",
      text: "#F4F4F4"
    }
  }
});

export { ThemeProvider, ThemeConsumer, useTheme };
```

`./app.jsx`

```jsx
import React from "react";
import { ThemeProvider } from "./theme.js";
import Dashboard from "./Dashboard.jsx";

const App = () => {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
};

export default App;
```

`./Dashboard.jsx`

```jsx
import React from "react";
import { useTheme } from "./theme.js";

const Dashboard = () => {
  const { setCurrentTheme, theme } = useTheme();

  const changeTheme = () =>
    setCurrentTheme((current) => (current === "normal" ? "dark" : "normal"));

  return (
    <div style={{ background: theme.styles.background, minHeight: "100vh" }}>
      <button type="button" onClick={changeTheme}>
        Toggle Theme
      </button>
      <p style={{ color: theme.styles.text }}>Current theme: {theme.name}</p>
    </div>
  );
};

export default Dashboard;
```

## 💾 Installation

```sh
npm install react-dynamic-theme
```

or

```sh
yarn add react-dynamic-theme
```

## ✔️ TypeScript Support

**react-dynamic-theme** already has a built-in TypeScript support. 
Here is an example on how to setup your theme with TypeScript.

`./theme.ts`

```tsx
import { createTheme } from "react-dynamic-theme";
import { DefaultThemeStyle } from "react-dynamic-theme/type";

interface CustomStyle extends DefaultThemeStyle {
  borderRadius: number | string;
}

const { ThemeProvider, ThemeConsumer, useTheme } = createTheme<
  /* All available themes */
  "normal" | "dark",

  /* 
    Pass your custom style here if any, otherwise you
    can pass DefaultThemeStyle from react-dynamic-theme
  */
  CustomStyle
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

export { ThemeProvider, ThemeConsumer, useTheme };
```
