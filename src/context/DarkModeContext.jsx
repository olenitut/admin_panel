import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleDarkMode = () => setIsDark((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDark]);

  return (
    <DarkModeContext.Provider
      value={{ isDark, toggleDarkMode, toggleMenu, isMenuOpen }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};

export default DarkModeProvider;
