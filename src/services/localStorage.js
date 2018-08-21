import { throttle } from 'lodash';
const NS = 'ADS-lite#';

export const set = (name, value) => {
  try {
    const item = JSON.stringify(value);
    localStorage.setItem(NS + name, item);
  } catch (e) {
    // ignore
  }
}

export const get = (name) => {
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
  return get('app-state');
}

export const saveState = throttle((state) => {
  return set('app-state', state);
}, 1000);
