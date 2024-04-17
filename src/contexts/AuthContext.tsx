import { createContext, useContext, useEffect, useState } from "react";


interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  isBusiness: boolean;
  login: (jwt: string, business: boolean) => void;  
  logout: () => void;
}


export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: null, 
  isBusiness: false,
  login: () => { },
  logout: () => { },
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null); 
  const [isBusiness, setIsBusiness] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedIsBusiness = localStorage.getItem("isBusiness") === 'true';  
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
      setIsBusiness(storedIsBusiness);
    }
  }, []);

  const login = (jwt: string, business: boolean) => {
    if (jwt === undefined || business === undefined) {
      console.error("Token or business status is undefined.");
      return; // Prevent further execution
    }

    setIsLoggedIn(true);
    setToken(jwt);
    setIsBusiness(business);
    localStorage.setItem("token", jwt);
    // Only set 'isBusiness' in localStorage if it's defined and not null
    if (business !== undefined && business !== null) {
      localStorage.setItem("isBusiness", business.toString());
    } else {
      console.error("Business status is undefined or null.");
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
    setIsBusiness(false);  
    localStorage.removeItem("token");
    localStorage.removeItem("isBusiness");  
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, isBusiness, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuth = () => useContext(AuthContext);

/* export const AuthContext = createContext({
  isLoggedIn: false,
  login: (jwt: string) => {},
  logout: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // run code once - when the component is mounted:
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (jwt: string) => {
    setIsLoggedIn(true);
    localStorage.setItem("token", jwt);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; */
