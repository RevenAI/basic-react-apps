import { useEffect, useState } from 'react';
import api from '../src/apiRequest/apiRequest';
import axios from 'axios';

const MyComponent = () => {
  const [posts, setPosts] = useState([]);
  const [settings, setSettings] = useState({});
  const [postFetchError, setPostFetchError] = useState('');
  const [settingsFetchError, setSettingsFetchError] = useState('');
  const [isPostsLoading, setIsPostsLoading] = useState(true);
  const [isSettingsLoading, setIsSettingsLoading] = useState(true);

  // Reusable fetch helper
  const fetchData = async (url, setData, setError, setLoading) => {
    try {
      const response = await api.get(url);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true; // Prevent state updates on unmounted component
    if (isMounted) {
      fetchData('/posts', setPosts, setPostFetchError, setIsPostsLoading);
    }
    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    let isMounted = true; // Prevent state updates on unmounted component
    if (isMounted) {
      fetchData('/app-settings', setSettings, setSettingsFetchError, setIsSettingsLoading);
    }
    return () => (isMounted = false);
  }, []);


 /*  const CancelToken = axios.CancelToken;
  const fetchData = async (url, setData, setErr, setLoading, source) => {
    try {
      const response = await axios.get(url, { cancelToken: source.token });
      setData(response.data);
      setErr(null);
    } catch (err) {
      if (axios.isCancel(err)) {
        setErr('Request canceled: ' + err.message);
      } else if (err.response) {
        setErr(err.response.data.message || 'An error occurred');
      } else {
        setErr(err.message || 'Network error occurred');
      }
    } finally {
      setLoading(false);
    }
  }; */



/* const catchErr = (err) {
        if (axios.isCancel(err)) {
          setErr(`Request canceled: ${ err.message }`);
        } else if (err.response) {
          setErr(err.response.data.message || 'An error occurred');
        } else {
          setErr(err.message || 'Network error occurred');
        }
} */



  return (
    <div>
      {isPostsLoading && <p>Loading posts...</p>}
      {postFetchError && <p>Error: {postFetchError}</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      {isSettingsLoading && <p>Loading settings...</p>}
      {settingsFetchError && <p>Error: {settingsFetchError}</p>}
      <pre>{JSON.stringify(settings, null, 2)}</pre>
    </div>
  );
};

export default MyComponent;
