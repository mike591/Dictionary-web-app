import React from "react";
import styles from "./styles.module.css";
import classNames from "classnames";

export type PlayButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};
const PlayButton: React.FC<PlayButtonProps> = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(styles.playButton, disabled && styles.disabled)}
      disabled={disabled}
    ></button>
  );
};

export default PlayButton;
