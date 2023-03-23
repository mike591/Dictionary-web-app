import React, { useEffect, useState } from "react";
import classnames from "classnames";
import styles from "./styles.module.css";
import useFont, { Font } from "@/hooks/useFont";

type HeaderComponentProps = {
  className: string;
  children: React.ReactNode;
};
const headerSizeToComponent = {
  large: (props: HeaderComponentProps) => <h1 {...props} />,
  medium: (props: HeaderComponentProps) => <h3 {...props} />,
  small: (props: HeaderComponentProps) => <h5 {...props} />,
};

export type HeaderProps = {
  children?: React.ReactNode;
  size?: "small" | "medium" | "large";
  typeOverride?: Font;
  className?: string;
};
const Header: React.FC<HeaderProps> = ({
  children,
  size = "medium",
  typeOverride,
  className,
}) => {
  const { currentFont } = useFont();
  const [type, setCurrentType] = useState<Font>(currentFont);
  const HeaderComponent = headerSizeToComponent[size];

  useEffect(() => {
    setCurrentType(typeOverride || currentFont);
  }, [currentFont]);

  return (
    <HeaderComponent
      className={classnames(
        styles.header,
        styles[size],
        styles[type],
        className
      )}
    >
      {children}
    </HeaderComponent>
  );
};

export default Header;
