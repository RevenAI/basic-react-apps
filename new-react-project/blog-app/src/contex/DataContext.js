import { useState, useEffect, createContext } from "react";
import useWindowSize from "../hooks/useWindowSize";
import axios from "axios";
import { fetchData } from "../utils/helpers";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [settings, setSettings] = useState([]);
    const [search, setSearch] = useState("");
    const [deleteMsg, setDeleteMsg] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [postOkMessage, setPostOkMessage] = useState(null);
    const [postErrors, setPostErrors] = useState(null);
    const [settingsErrors, setSettingsErrors] = useState(null);
    const [isPostLoading, setIsPostLoading] = useState(true);
    const [isSettingsLoading, setIsSettingsLoading] = useState(true);

  const { width } = useWindowSize();

 useEffect(() => {
    const source = axios.CancelToken.source();
    fetchData("/posts", setPosts, setPostErrors, setIsPostLoading, source);

    return () => {
      source.cancel("Operation canceled.");
    };
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();
    fetchData("/app-settings", setSettings, setSettingsErrors, setIsSettingsLoading, source);

    return () => {
      source.cancel("Operation canceled.");
    };
  }, []);

  useEffect(() => {
    const filteredResults = posts.filter((post) =>
      [post.title, post.body].some((field) =>
        field?.toLowerCase().includes(search.toLowerCase())
      )
    );
    setSearchResults(filteredResults.reverse());
  }, [search, posts]);

   return <DataContext.Provider value={{
    settingsErrors, width, settings, isSettingsLoading,
    search, setSearch,
    posts, setPosts, deleteMsg, setDeleteMsg, isPostLoading, setIsPostLoading, postOkMessage, setPostOkMessage, 
    postErrors, setPostErrors, searchResults,
    }}>
        { children }
    </DataContext.Provider>
}

export default DataContext




