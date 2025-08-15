export function ThemeGlobalStyles() {
  const { theme } = useTheme();

  const globalStyles = `
    :root {
      --color-primary: ${theme.colors.primary};
      --color-secondary: ${theme.colors.secondary};
      --color-background: ${theme.colors.background};
      --color-tertiary: ${theme.colors.tertiary};
      --color-card-bg: ${theme.colors.cardBackground};
      
      --font-main: ${theme.fonts.main};
      --font-headings: ${theme.fonts.headings};
      
    }
    
    body {
      background-color: var(--color-background);
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-headings);
    }
  `;

  return <style>{globalStyles}</style>;
}