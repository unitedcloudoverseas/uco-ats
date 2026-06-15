import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext =
  createContext();

export const ThemeProvider =
({
  children,
}) => {

  const [theme,
    setTheme] =
    useState(
      localStorage.getItem(
        "theme"
      ) || "light"
    );

  /* =========================
     APPLY THEME
  ========================= */

  useEffect(() => {

    const html =
      document.documentElement;

    html.classList.remove(
      "light",
      "dark"
    );

    html.classList.add(
      theme
    );

    localStorage.setItem(
      "theme",
      theme
    );

  }, [theme]);

  /* =========================
     TOGGLE THEME
  ========================= */

  const toggleTheme =
    () => {

      setTheme(
        theme === "light"
          ? "dark"
          : "light"
      );

    };

  return (

    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >

      {children}

    </ThemeContext.Provider>

  );

};

export const useTheme =
  () =>
    useContext(
      ThemeContext
    );