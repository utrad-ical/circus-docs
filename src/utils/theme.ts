export type Theme = 'light' | 'dark';

const storageKey = 'theme';

/**
 * Runs before the first paint so that the stored theme applies without a flash.
 * The default is light regardless of the OS setting.
 */
export const themeBootstrapScript = `try{if(localStorage.getItem('${storageKey}')==='dark')document.documentElement.dataset.theme='dark'}catch(e){}`;

const changeEvent = 'themechange';

export const readTheme = (): Theme =>
  document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

export const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(storageKey, theme);
  } catch {
    // The choice just does not persist
  }
  window.dispatchEvent(new Event(changeEvent));
};

export const subscribeTheme = (callback: () => void) => {
  window.addEventListener(changeEvent, callback);
  return () => window.removeEventListener(changeEvent, callback);
};
