import { useState } from "react";

export const useAuthHook = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (response: boolean) => {
    setIsLoggedIn(response);
    return response;
  };

  return { isLoggedIn, login };
};
