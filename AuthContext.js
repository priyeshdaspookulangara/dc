import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        login: async (username, password) => {
          try {
            const response = await fetch('http://benessanaturals.com/hms/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data.token) {
              setToken(data.token);
              setUser(data.user);
            }
            return data;
          } catch (error) {
            console.error(error);
          }
        },
        logout: () => {
          setToken(null);
          setUser(null);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
