import { FC, useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import caretDown from "@/assets/images/icon-arrow-down.svg";
import classNames from "classnames";
import useFont, { fonts } from "@/hooks/useFont";
import Text from "@/components/Text";
import useTheme from "@/hooks/useTheme";

const FontSelector: FC = () => {
  const { getDisplayForFontValue, currentFont, setFont } = useFont();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div ref={ref} className={styles.fontSelector}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.button}>
        <Text>{getDisplayForFontValue(currentFont)}</Text>
        <img src={caretDown} alt="caret down" className={styles.icon} />
      </button>
      <div
        className={classNames(
          styles.popup,
          isOpen && styles.open,
          styles[theme]
        )}
      >
        {isOpen && (
          <div className={classNames(styles.options)}>
            {fonts.map((font) => (
              <button
                key={font}
                onClick={() => {
                  setFont(font);
                  setIsOpen(false);
                }}
                className={classNames(
                  styles.option,
                  font === currentFont && styles.selected,
                  styles[theme]
                )}
              >
                <Text typeOverride={font}>{getDisplayForFontValue(font)}</Text>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FontSelector;
