import { throttle } from 'lodash';
const NS = 'ADS-lite#';

export const setStorageItem = (name, value) => {
  try {
    const item = JSON.stringify(value);
    localStorage.setItem(NS + name, item);
  } catch (e) {
    // ignore
  }
}

export const getStorageItem = (name) => {
  try {
    const item = localStorage.getItem(NS + name);
    if (item === null) {
      return undefined;
    }
    return JSON.parse(item);
  } catch (e) {
    return undefined;
  }
}

export const loadState = () => {
  return getStorageItem('app-state');
}

export const saveState = throttle((state) => {
  return setStorageItem('app-state', state);
}, 1000);
