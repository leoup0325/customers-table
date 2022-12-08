import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import client from "../apis/client";
import { parseAxiosError } from "../utils/axios";

export const useFetchAPI = (config) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const dataFetchRef = useRef(false);

  const { t } = useTranslation();

  const fetchAPI = async () => {
    setLoading(true);
    try {
      const { data: res } = await client(config);
      setData(res);
    } catch (e) {
      setError(parseAxiosError(e, t));
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!dataFetchRef.current) {
      dataFetchRef.current = true;
      fetchAPI();
    }
  }, []);

  return { data, loading, error };
};
