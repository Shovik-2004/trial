import React, { FC, ReactNode, createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeMode;
  isDark: boolean;
  setTheme: (theme: ThemeMode) => void;
  colors: {
    background: string;
    text: string;
    primaryText: string;
    secondaryText: string;
    card: string;
    primary: string;
    secondary: string;
    accent: string;
    border: string;
    error: string;
    success: string;
    tabBar: string;
    tabBarInactive: string;
  };
}

const defaultColors = {
  light: {
    background: '#F9FAFB',
    text: '#1F2937',
    primaryText: '#111827',
    secondaryText: '#4B5563',
    card: '#FFFFFF',
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    accent: '#F59E0B',
    border: '#E5E7EB',
    error: '#EF4444',
    success: '#10B981',
    tabBar: '#FFFFFF',
    tabBarInactive: '#9CA3AF',
  },
  dark: {
    background: '#111827',
    text: '#F9FAFB',
    primaryText: '#F3F4F6',
    secondaryText: '#D1D5DB',
    card: '#1F2937',
    primary: '#60A5FA',
    secondary: '#A78BFA',
    accent: '#FBBF24',
    border: '#374151',
    error: '#F87171',
    success: '#34D399',
    tabBar: '#1F2937',
    tabBarInactive: '#6B7280',
  },
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  isDark: false,
  setTheme: (() => {}) as (theme: ThemeMode) => void,
  colors: defaultColors.light,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setThemeState] = useState<ThemeMode>('system');

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setThemeState(savedTheme as ThemeMode);
        }
      } catch (e) {
        console.log('Failed to load theme');
      }
    };

    loadTheme();
  }, []);

  const setTheme = async (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (e) {
      console.log('Failed to save theme');
    }
  };

  const isDark =
    theme === 'system' ? systemColorScheme === 'dark' : theme === 'dark';

  const colors = isDark ? defaultColors.dark : defaultColors.light;

  return (
    <ThemeContext.Provider value={{ theme, isDark, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};
