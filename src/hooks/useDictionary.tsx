import { useState } from "react";

const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/<word>";

export type DictionaryItem = {
  license: {
    name: string;
    url: string;
  };
  meanings: {
    antonyms: string[];
    definitions: {
      antonyms: string[];
      definition: string;
      synonyms: string[];
      example?: string;
    }[];
    partOfSpeech: string;
    synonyms: string[];
  }[];
  phonetic: string;
  phonetics: {
    text: string;
    audio: string;
  }[];
  sourceUrls: string[];
  word: string;
};

export type DictionaryErrorItem = {
  title: string;
  message: string;
  resolution: string;
};

const useDictionary = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<DictionaryErrorItem>();
  const [data, setData] = useState<DictionaryItem>();

  async function fetchDictionary(word: string) {
    setLoading(true);
    try {
      const response = await fetch(BASE_URL.replace("<word>", word));
      const json = await response.json();
      if (response.status !== 200) {
        setError(json);
      } else {
        setData(json[0]);
        setError(undefined);
      }
    } catch (e) {
      setError({
        title: "Something went wrong",
        message: "We couldn't find the word you were looking for.",
        resolution: "Please try again later.",
      });
    }
    setLoading(false);
  }

  return {
    loading,
    error,
    data,
    fetchDictionary,
  };
};

export default useDictionary;
