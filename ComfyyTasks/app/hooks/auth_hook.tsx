import { useState } from "react";

export const useAuthHook = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const login = (response: boolean) => {
    setIsLoggedIn(response);
    return response;
  };

  return { isLoggedIn, login };
};
