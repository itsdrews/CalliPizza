// theme.jsx
import { createContext, useContext, useState, useMemo } from 'react';

// 1. Definir os temas disponíveis
const lightTheme = {
  name: 'light',
  colors: {
    primary: '#8c1c13;',
    secondary: '#bf4342',
    tertiary: '#a78a7f',
    background: '#e7d7c1',
    dark: '#735751',
    darker:'#3f1b13',
  },
    fonts: {
    main: 'poppins, sans-serif',
    headings: 'Lilita-One, sans-serif'
  },
};


// 2. Criar o contexto de tema
const ThemeContext = createContext();

// 3. Criar o provedor de tema
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(lightTheme);



  // Memoizar o valor do contexto para otimização
  const value = useMemo(() => ({
    theme,
    setTheme
  }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 4. Hook personalizado para usar o tema
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// 5. Componente para injetar variáveis CSS globais
export function ThemeGlobalStyles() {
  const { theme } = useTheme();

  const globalStyles = `
    :root {
      --color-primary: ${theme.colors.primary};
      --color-secondary: ${theme.colors.secondary};
      --color-background: ${theme.colors.background};
      --color-text: ${theme.colors.text};
      --color-card-bg: ${theme.colors.cardBackground};
      --color-border: ${theme.colors.border};
      --color-success: ${theme.colors.success};
      --color-warning: ${theme.colors.warning};
      --color-danger: ${theme.colors.danger};
      
      --font-main: ${theme.fonts.main};
      --font-headings: ${theme.fonts.headings};
      
      --spacing-small: ${theme.spacing.small};
      --spacing-medium: ${theme.spacing.medium};
      --spacing-large: ${theme.spacing.large};
    }
    
    body {
      background-color: var(--color-background);
      color: var(--color-text);
      font-family: var(--font-main);
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-headings);
    }
  `;

  return <style>{globalStyles}</style>;
}