import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import "@/styles/colors.css";
import "@/styles/fonts.css";
import "./index.css";
import useTheme, { ProvideTheme } from "@/hooks/useTheme";
import { ProvideFont } from "@/hooks/useFont";
import classNames from "classnames";

const Root = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames("main", theme)}>
      <App />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ProvideTheme>
      <ProvideFont>
        <Root />
      </ProvideFont>
    </ProvideTheme>
  </React.StrictMode>
);
