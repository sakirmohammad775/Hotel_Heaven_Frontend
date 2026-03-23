import { useEffect, useState } from "react";
import apiClient from "../services/Api-Client";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Get token from localStorage
  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  };

  const [authTokens, setAuthTokens] = useState(getToken());

  // Fetch user profile
  const fetchUserProfile = async () => {
    if (!authTokens?.access) return;

    try {
      const response = await apiClient.get("/auth/users/me/", {
        headers: {
          Authorization: `JWT ${authTokens.access}`,
        },
      });

      setUser(response.data);
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  // Run when token changes
  useEffect(() => {
    if (authTokens?.access) {
      fetchUserProfile();
    }
  }, [authTokens]);

  // Handle API errors
  const handleAPIError = (
    error,
    defaultMessage = "Something went wrong! Try again."
  ) => {
    console.log(error);

    if (error.response && error.response.data) {
      const errorMessage = Object.values(error.response.data).flat().join("\n");
      setErrorMsg(errorMessage);
      return { success: false, message: errorMessage };
    }

    setErrorMsg(defaultMessage);

    return {
      success: false,
      message: defaultMessage,
    };
  };

  // Update profile
  const updateUserProfile = async (data) => {
    setErrorMsg("");

    try {
      await apiClient.put("/auth/users/me/", data, {
        headers: {
          Authorization: `JWT ${authTokens?.access}`,
        },
      });

      await fetchUserProfile();

      return { success: true };
    } catch (error) {
      return handleAPIError(error);
    }
  };

  // Change password
  const changePassword = async (data) => {
    setErrorMsg("");

    try {
      await apiClient.post("/auth/users/set_password/", data, {
        headers: {
          Authorization: `JWT ${authTokens?.access}`,
        },
      });

      return { success: true };
    } catch (error) {
      return handleAPIError(error);
    }
  };

  // Login
  const loginUser = async (userData) => {
    setErrorMsg("");

    try {
      const response = await apiClient.post("/auth/jwt/create/", userData);

      setAuthTokens(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));

      await fetchUserProfile();

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.detail || "Login failed";
      setErrorMsg(message);

      return { success: false, message };
    }
  };

  // Register
  const registerUser = async (userData) => {
    try {
      await apiClient.post("/auth/users/", userData);

      return {
        success: true,
        message: "Registration successful. Check your email to activate account.",
      };
    } catch (error) {
      return {
        success: false,
        message: "Validation error",
        errors: error.response?.data,
      };
    }
  };

  // Logout
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  return {
    user,
    authTokens,
    errorMsg,
    loginUser,
    registerUser,
    logoutUser,
    changePassword,
    updateUserProfile,
  };
};

export default useAuth;