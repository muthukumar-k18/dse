import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { userService, User } from '../utils/userService';

interface UserContextType {
  currentUser: User | null;
  activeRole: string;
  setUser: (userId: string) => void;
  switchRole: (role: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeRole, setActiveRole] = useState<string>('');

  useEffect(() => {
    // Load current user on mount
    const user = userService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setActiveRole(userService.getActiveRole(user.id));
    }
  }, []);

  const setUser = (userId: string) => {
    if (userService.setCurrentUser(userId)) {
      const user = userService.getUserById(userId);
      setCurrentUser(user);
      if (user) {
        setActiveRole(userService.getActiveRole(user.id));
      }
    }
  };

  const switchRole = (role: string) => {
    if (currentUser && userService.switchRole(currentUser.id, role)) {
      setActiveRole(role);
    }
  };

  const logout = () => {
    userService.clearCurrentUser();
    setCurrentUser(null);
    setActiveRole('');
  };

  return (
    <UserContext.Provider value={{ currentUser, activeRole, setUser, switchRole, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
