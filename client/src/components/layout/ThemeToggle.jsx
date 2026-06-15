import {
  useTheme,
} from "../../context/ThemeContext";

const ThemeToggle = () => {

  const {
    theme,
    toggleTheme,
  } = useTheme();

  return (

    <button
      onClick={toggleTheme}
      className="
      h-10
      px-4
      rounded-xl
      border
      border-slate-200
      dark:border-slate-700
      bg-white
      dark:bg-slate-900
      transition
      "
    >

      {
        theme === "light"
          ? "🌙"
          : "☀️"
      }

    </button>

  );

};

export default ThemeToggle;