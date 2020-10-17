const returnTheme = (darkMode = false) => {
  const lightColors = {
    primary: '#ea8b13',
    secondary: '#a7c811',
    bg: '#ffffff',
    bgContrast: '#fafafa',
    fg: '#1e1e24',
    detail: '#f9f9f9'
  }
  const darkColors = {
    primary: '#ea8b13',
    secondary: '#a7c811',
    bg: '#222222',
    bgContrast: '#333333',
    fg: '#fafafa',
    detail: '#181818'
  }

  return {
    isDark: darkMode,
    colors: darkMode === true ? darkColors : lightColors,
    breakpoints: {
      xs: '0px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px'
    },
    font: {
      xs: '8pt',
      sm: '12pt',
      md: '18pt',
      lg: '24pt',
      xl: '25pt'
    }
  }
}

export default returnTheme
