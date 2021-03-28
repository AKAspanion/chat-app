export const lightCSSVariables = {
  '--text-color-primary': 'rgba(0, 0, 0, 0.86)',
  '--text-color-secondary': 'rgba(0, 0, 0, 0.7)',
  '--text-color-disabled': 'rgba(0, 0, 0, 0.56)',
  '--primary-bg': '#f3f6ff',
  '--primary': '#2255be',
  '--white': '#ffffff',
  '--black': '#222222',
};

export const darkCSSVariables = {
  '--text-color-primary': 'rgba(255, 255, 255, 1)',
  '--text-color-secondary': 'rgba(255, 255, 255, 0.8)',
  '--text-color-disabled': 'rgba(255, 255, 255, 0.56)',
  '--primary-bg': '#292929',
  '--primary': '#2255be',
  '--white': '#3d3d3d',
  '--black': '#000000',
};

export const setCSSVariable = (element: any, variable: any, value: any) => {
  if (element && value) {
    element.style.setProperty(variable, String(value));
  }
};

export const overrideThemeVariables = (themeObject: any) => {
  const root = document.querySelector(':root');
  const themeVariables = Object.keys(themeObject);

  if (root && themeObject) {
    themeVariables.forEach(themeVar => {
      const varValue = themeObject[themeVar];
      if (varValue && themeVar.startsWith('--')) {
        setCSSVariable(root, themeVar, varValue);
      }
    });
  }
};
