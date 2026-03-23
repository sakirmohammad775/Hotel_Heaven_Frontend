import { useEffect, useState } from "react";
import apiClient from "../services/Api-Client";

const useFetchHotels = (
  currentPage,
  selectedCategory,
  searchQuery,
  sortOrder
) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);

      let url = `/hotels/?page=${currentPage}`;

      if (selectedCategory) {
        url += `&category=${selectedCategory}`;
      }

      if (searchQuery) {
        url += `&search=${searchQuery}`;
      }

      if (sortOrder) {
        url += `&ordering=${sortOrder}`;
      }

      try {
        const res = await apiClient.get(url);
        const data = res.data;

        setHotels(data.results);
        setTotalPages(Math.ceil(data.count / data.results.length));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [currentPage, selectedCategory, searchQuery, sortOrder]);

  return { hotels, loading, totalPages };
};

export default useFetchHotels;