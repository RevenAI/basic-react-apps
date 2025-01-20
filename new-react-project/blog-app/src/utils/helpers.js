import axios from "axios";
import api from "../apiRequest/apiRequest";

export const catchErr = (err, setErr) => {
    if (axios.isCancel(err)) {
      setErr(`Request canceled: ${err.message}`);
    } else if (err.response) {
      setErr(err.response.data.message || "An error occurred");
    } else {
      setErr(err.message || "Network error occurred");
    }
  };

export const clearSetData = (actionFunction, limitTime) => {
    let validTime;
    if (typeof limitTime === 'string') {
      validTime = parseInt(limitTime);
    } else {
      validTime = limitTime;
    }
    
    if (isNaN(validTime)) throw new Error('Limit time must be a valid numeric number');

    const timeoutId = setTimeout(() => {
      actionFunction(null);
    }, validTime);
  
    return timeoutId;
  };  

export const fetchData = async (url, setData, setErr, setLoading, source) => {
    try {
      const response = await api.get(url, { cancelToken: source.token });
      setData(response.data);
      setErr(null);
    } catch (err) {
      if (axios.isCancel(err)) {
        setErr(`Request canceled: ${err.message}`);
      } else if (err.response) {
        setErr(err.response.data.message || "An error occurred");
      } else {
        setErr(err.message || "Network error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

