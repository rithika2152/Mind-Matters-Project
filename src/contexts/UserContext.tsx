import React, { createContext, useContext, useState, useEffect } from 'react';
import * as db from '../services/db';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  assessments: any[];
  moodHistory: any[];
}

interface UserContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserData: (userId: string, data: Partial<User>) => Promise<User>;
  saveAssessment: (assessment: any) => Promise<void>;
  saveMood: (mood: any) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const user = await db.getUserByEmail(email);
      if (user && user.password === password) {
        const { password: _, ...userWithoutPassword } = user;
        setCurrentUser(userWithoutPassword);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const existingUser = await db.getUserByEmail(email);
      if (existingUser) return false;

      const newUser = await db.createUser({
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
        assessments: [],
        moodHistory: []
      });

      const { password: _, ...userWithoutPassword } = newUser;
      setCurrentUser(userWithoutPassword);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateUserData = async (userId: string, data: Partial<User>) => {
    const updatedUser = await db.updateUser(userId, data);
    if (currentUser?.id === userId) {
      const { password: _, ...userWithoutPassword } = updatedUser;
      setCurrentUser(userWithoutPassword);
    }
    return updatedUser;
  };

  const saveAssessment = async (assessment: any) => {
    if (!currentUser) throw new Error('No user logged in');
    const savedAssessment = await db.saveAssessment({
      ...assessment,
      userId: currentUser.id,
      date: new Date().toISOString()
    });
    
    const updatedUser = await updateUserData(currentUser.id, {
      assessments: [...(currentUser.assessments || []), savedAssessment]
    });
    setCurrentUser(updatedUser);
  };

  const saveMood = async (mood: any) => {
    if (!currentUser) throw new Error('No user logged in');
    const savedMood = await db.saveMood({
      ...mood,
      userId: currentUser.id,
      date: new Date().toISOString()
    });
    
    const updatedUser = await updateUserData(currentUser.id, {
      moodHistory: [...(currentUser.moodHistory || []), savedMood]
    });
    setCurrentUser(updatedUser);
  };

  return (
    <UserContext.Provider 
      value={{ 
        currentUser, 
        login, 
        register, 
        logout, 
        updateUserData,
        saveAssessment,
        saveMood
      }}
    >
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