import React from "react";
import searchIcon from "@/assets/images/icon-search.svg";
import styles from "./styles.module.css";
import classNames from "classnames";
import useFont from "@/hooks/useFont";

export type SearchFieldProps = {
  onSubmit: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
};
const SearchField: React.FC<SearchFieldProps> = ({
  placeholder = "Search",
  disabled,
  onSubmit,
}) => {
  const [value, setValue] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const { currentFont } = useFont();

  React.useEffect(() => {
    function handleClickedOutsideSearchField(event: { target: any }) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickedOutsideSearchField);
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickedOutsideSearchField
      );
    };
  }, [inputRef]);

  function handleSubmit() {
    if (disabled || alreadySubmitted) return;
    if (value.length > 0) {
      onSubmit(value);
      setAlreadySubmitted(true);
    } else {
      setErrorMsg("Whoops, can't be empty...");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (disabled) return;
    setAlreadySubmitted(false);
    setErrorMsg("");
    setValue(e.currentTarget.value);
  }

  return (
    <div className={classNames(styles.searchField, styles[currentFont])}>
      <div
        className={classNames(
          styles.inputWrapper,
          isFocused && styles.focusedBorder,
          errorMsg && styles.errorBorder
        )}
      >
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          onClick={() => setIsFocused(true)}
        />
        <button
          onClick={handleSubmit}
          className={styles.button}
          disabled={disabled}
        >
          <img src={searchIcon} alt="search" className={styles.img} />
        </button>
      </div>
      {errorMsg && <div className={styles.error}>{errorMsg}</div>}
    </div>
  );
};

export default SearchField;
