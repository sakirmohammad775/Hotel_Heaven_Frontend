import { useEffect, useState } from "react";
import apiClient from "../services/Api-Client";

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apiClient.get("/categories/").then((res) => {
      setCategories(res.data);
    });
  }, []);

  return categories;
};

export default useFetchCategories;