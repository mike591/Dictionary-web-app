import styles from "./styles.module.css";
import Header from "@/components/Header";
import Text from "@/components/Text";
import SearchField from "@/components/SearchField";
import PlayButton from "@/components/PlayButton";
import ThemeToggle from "@/components/ThemeToggle";
import FontSelector from "@/components/FontSelector";
import logo from "@/assets/images/logo.svg";
import useDictionary, { DictionaryItem } from "@/hooks/useDictionary";
import classNames from "classnames";
import newWindowIcon from "@/assets/images/icon-new-window.svg";
import useTheme from "@/hooks/useTheme";

export type ContentProps = {
  data: DictionaryItem;
};
const Content: React.FC<ContentProps> = ({ data }) => {
  const { theme } = useTheme();

  const phoneticsToUse =
    data.phonetics.find((p) => p.audio) || data.phonetics[0];

  function playAudio() {
    const audio = new Audio(phoneticsToUse.audio);
    audio.play();
  }

  return (
    <div>
      <div className={styles.contentHeader}>
        <div>
          <Header size="large">{data.word}</Header>
          <Text className={classNames(styles.phonetic, styles.purple)}>
            {phoneticsToUse.text}
          </Text>
        </div>
        <PlayButton onClick={playAudio} disabled={!phoneticsToUse.audio} />
      </div>
      {data.meanings.map((meaning, meaningIdx) => (
        <div key={meaningIdx}>
          <div className={styles.partOfSpeechWrapper}>
            <Text className={styles.partOfSpeech} typeOverride="sans">
              {meaning.partOfSpeech}
            </Text>
            <div className={classNames(styles.line, styles[theme])}></div>
          </div>
          <Text className={styles.light}>Meaning</Text>
          <ul className={styles.unorderedList}>
            {meaning.definitions.map((definition, definitionsIdx) => (
              <li className={styles.listItem} key={definitionsIdx}>
                <Text>{definition.definition}</Text>
                {definition.example && (
                  <Text className={styles.light}>"{definition.example}"</Text>
                )}
              </li>
            ))}
          </ul>
          <div className={styles.synonyms}>
            <Text className={styles.light}>Synonyms</Text>
            {meaning.synonyms.map((synonym, synonymIdx) => (
              <div key={synonymIdx}>
                <Text className={classNames(styles.purple, styles.bold)}>
                  {synonym}
                </Text>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div
        className={classNames(styles.line, styles[theme], styles.sourceLine)}
      ></div>
      <div className={styles.sourceWrapper}>
        <Text
          className={classNames(
            styles.light,
            styles.sourceHeader,
            styles[theme]
          )}
        >
          Source
        </Text>
        <a href={data.sourceUrls[0]} className={styles.link} target="_blank">
          <Text className={styles.linkText}>{data.sourceUrls[0]}</Text>
          <img src={newWindowIcon} alt="Open in new window" />
        </a>
      </div>
    </div>
  );
};

const App = () => {
  const { fetchDictionary, loading, error, data } = useDictionary();

  return (
    <div className={styles.app}>
      <div className={styles.header}>
        <img src={logo} alt="Logo" />
        <div className={styles.settings}>
          <FontSelector />
          <div className={styles.spacer}></div>
          <ThemeToggle />
        </div>
      </div>
      <SearchField
        onSubmit={(value) => fetchDictionary(value)}
        disabled={loading}
      />
      <div className={styles.content}>
        {loading && <Text>Loading...</Text>}
        {error && (
          <div className={styles.error}>
            <span className={styles.face}>😕</span>
            <Header className={styles.errorTitle}>{error.title}</Header>
            <Text className={styles.errorText}>
              {error.message} {error.resolution}
            </Text>
          </div>
        )}
        {!loading && !error && data && <Content data={data} />}
      </div>
    </div>
  );
};

export default App;
