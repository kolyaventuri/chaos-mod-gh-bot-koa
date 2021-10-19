import strings from './strings.json';

/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
type I18N = {
  [key: string]: string | I18N;
};
/* eslint-enable @typescript-eslint/consistent-indexed-object-style */

export const getString = (path: string, replacement: Record<string, string> = {}): string => {
  const parts = path.trim().split('.');
  let current: I18N | string = strings as I18N;

  for (const part of parts) {
    current = current[part];
    if (!current) {
      return '';
    }

    if (typeof current === 'string') {
      break;
    }
  }

  if (typeof current !== 'string') {
    return '';
  }

  let result = current;
  for (const [key, value] of Object.entries(replacement)) {
    result = result.replace(new RegExp(`{${key}}`, 'gi'), value);
  }

  return result;
};
