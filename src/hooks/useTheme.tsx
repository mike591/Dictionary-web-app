import { useEffect, useState, createContext, useContext } from "react";

const useProvideTheme = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const devicePrefersColor = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const siteColorSettingsOverride = localStorage.getItem("theme");

    if (siteColorSettingsOverride === "dark") {
      setTheme("dark");
    } else if (devicePrefersColor && siteColorSettingsOverride !== "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  function toggleTheme() {
    if (localStorage.getItem("theme") === "dark") {
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  }

  return {
    theme,
    toggleTheme,
  };
};

export type ThemeContextType = ReturnType<typeof useProvideTheme>;
const initialState = {
  theme: "light",
  toggleTheme: () => {},
};
export const ThemeContext = createContext<ThemeContextType>(initialState);

export const ProvideTheme = ({ children }: { children: React.ReactNode }) => {
  const font = useProvideTheme();
  return <ThemeContext.Provider value={font}>{children}</ThemeContext.Provider>;
};

export default () => {
  return useContext(ThemeContext);
};
