import { createContext, use, useContext, useState } from "react";

// Create a new context for authentication
const AuthContext = createContext();

// AuthProvider component will wrap parts of the app that need access to auth state
export const AuthProvider = ({ children }) => {
  // user: stores the current user object (null if not logged in)
  // setUser: function to update the user state
  const [user, setUser] = useState(null);

  // Provide the user and setUser to all child components via context
  return (
    <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
  );
};

// Custom hook to easily access the AuthContext in other components
export const useAuth = () => useContext(AuthContext);
