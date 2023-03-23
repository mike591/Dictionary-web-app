import React from "react";
import useTheme from "@/hooks/useTheme";
import classNames from "classnames";
import styles from "./styles.module.css";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={styles.themeToggle}>
      <button
        onClick={toggleTheme}
        className={classNames(styles.button, styles[theme])}
      >
        <div className={classNames(styles.ball, styles[theme])}></div>
      </button>
      <div className={classNames(styles.moon, styles[theme])}></div>
    </div>
  );
};

export default ThemeToggle;
