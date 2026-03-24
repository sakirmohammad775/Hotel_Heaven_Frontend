import { useEffect, useState } from "react";
import authApiClient from "../services/Auth-Api-Client";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  };

  const [authTokens, setAuthTokens] = useState(getToken());

  // ✅ Fetch user (NO manual header needed)
  const fetchUserProfile = async () => {
    if (!authTokens?.access) return;

    try {
      const response = await authApiClient.get("/auth/users/me/");
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [authTokens]);

  const handleAPIError = (error, defaultMessage = "Something went wrong!") => {
    if (error.response?.data) {
      const message = Object.values(error.response.data).flat().join("\n");
      setErrorMsg(message);
      return { success: false, message };
    }

    setErrorMsg(defaultMessage);
    return { success: false, message: defaultMessage };
  };

  // ✅ Login
  const loginUser = async (userData) => {
    try {
      const response = await authApiClient.post("/auth/jwt/create/", userData);

      setAuthTokens(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));

      await fetchUserProfile();

      return { success: true };
    } catch (error) {
      return handleAPIError(error, "Login failed");
    }
  };

  // ✅ Register
  const registerUser = async (userData) => {
    try {
      await authApiClient.post("/auth/users/", userData);
      return {
        success: true,
        message: "Check email to activate account",
      };
    } catch (error) {
      return handleAPIError(error, "Registration failed");
    }
  };

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
  };
};

export default useAuth;