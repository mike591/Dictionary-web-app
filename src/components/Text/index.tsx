import React from "react";
import classnames from "classnames";
import styles from "./styles.module.css";
import useFont, { Font } from "@/hooks/useFont";

export type TextProps = {
  children?: React.ReactNode;
  size?: "small" | "medium";
  typeOverride?: Font;
  className?: string;
};
const Text: React.FC<TextProps> = ({
  children,
  size = "medium",
  typeOverride,
  className,
}) => {
  const { currentFont } = useFont();
  const type = typeOverride || currentFont;
  return (
    <p
      className={classnames(styles.text, styles[size], styles[type], className)}
    >
      {children}
    </p>
  );
};

export default Text;
