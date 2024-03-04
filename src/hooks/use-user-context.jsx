import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

export const useUserContext = () => {
  return useContext(UserContext);
};

export default function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = window.localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
