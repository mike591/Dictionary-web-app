import React from "react";
import styles from "./styles.module.css";
import classNames from "classnames";
import useTheme from "@/hooks/useTheme";

export type LoaderProps = {
  children?: React.ReactNode;
  isLoading: boolean;
};
const Loader: React.FC<LoaderProps> = ({ children, isLoading = false }) => {
  const { theme } = useTheme();

  return (
    <div className={classNames(styles.loader)}>
      {isLoading && (
        <div className={classNames(styles.background, styles[theme])}></div>
      )}
      {isLoading && <div className={styles.spinner}></div>}
      {children}
    </div>
  );
};

export default Loader;
