import { useEffect, useState, useCallback } from 'react';
import FetchApiServiceInstance from '@/helpers/FetchApiUtil';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const useNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/portalWebFormula1/noticias`;
    const token = useAuthHeader();

    const getAllNews = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await FetchApiServiceInstance.getAll(apiUrl, token);
            console.log("Data from API:", data);
            setNews(data);
        } catch (err) {
            console.error("Error fetching news:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const getNewsById = useCallback(async (id) => { // useCallback para evitar loop infinito
        setLoading(true);
        setError(null);
        try {
        const singleNewsApiUrl = `${apiUrl}/${id}`;
          const data = await FetchApiServiceInstance.getById(singleNewsApiUrl, token);
          console.log("Data from API (getNewsById):", data);
          return data;
        } catch (err) {
          console.error(`Error fetching news with ID ${id}:`, err);
          setError(err);
          return null;
        } finally {
          setLoading(false);
        }
      }, [apiUrl, token]);

    const createNews = async (newsItem) => {
        try {
            const res = await FetchApiServiceInstance.create(apiUrl, newsItem, token);
            setNews(prevNews => [...prevNews, newsItem]);
            return res;
        } catch (error) {
            console.error("Error creating news:", error);
            setError(error);
            throw error;
        }
    };

    const updateNews = async (newsItem) => {
        try {
            const res = await FetchApiServiceInstance.update(apiUrl, newsItem, token);
            setNews(prevNews => {
                return prevNews.map(item => item.id === newsItem.id ? newsItem : item);
            });
            return res;
        } catch (error) {
            console.error("Error updating news:", error);
            setError(error);
            throw error;
        }
    };

    const deleteNews = async (newsItem) => {
        try {
            await FetchApiServiceInstance.delete(apiUrl, newsItem, token);
            setNews((prevNews) => {
                const temp = [...prevNews].filter((x) => x.id !== newsItem.id);
                return temp;
            });
        } catch (error) {
            console.error(error);
            setError(error);
            throw error;
        }
    };

    useEffect(() => {
        getAllNews();
    }, []);

    return {
        news,
        loading,
        error,
        getAllNews,
        createNews,
        updateNews,
        deleteNews,
        getNewsById,
    };
};

export default useNews;