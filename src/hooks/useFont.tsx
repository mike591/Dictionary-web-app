import { useEffect, useState, createContext, useContext } from "react";

export const fonts = ["sans", "serif", "mono"];

export type Font = typeof fonts[number];

const useProvideFont = () => {
  const [currentFont, setCurrentFont] = useState<Font>("sans");

  useEffect(() => {
    const font = localStorage.getItem("font");
    const fontIsInvalid = !font || !fonts.includes(font);

    if (fontIsInvalid) {
      localStorage.setItem("font", "sans");
      setCurrentFont("sans");
    } else {
      setCurrentFont(font);
    }
  }, []);

  function getDisplayForFontValue(font: Font) {
    return {
      sans: "Sans Serif",
      serif: "Serif",
      mono: "Mono",
    }[font];
  }

  function setFont(font: Font) {
    setCurrentFont(font);
    localStorage.setItem("font", font);
  }

  return { currentFont, getDisplayForFontValue, setFont };
};

export type FontContextType = ReturnType<typeof useProvideFont>;
const initialState = {
  currentFont: "sans",
  getDisplayForFontValue: () => "Sans Serif",
  setFont: () => {},
};
export const FontContext = createContext<FontContextType>(initialState);

export const ProvideFont = ({ children }: { children: React.ReactNode }) => {
  const font = useProvideFont();
  return <FontContext.Provider value={font}>{children}</FontContext.Provider>;
};

export default () => {
  return useContext(FontContext);
};
