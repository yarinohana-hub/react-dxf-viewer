// Browser stub for Node.js 'fs' module
// This prevents runtime errors when libraries like opentype.js check for fs

export const readFileSync = (): null => null;
export const readFile = (): null => null;
export const writeFileSync = (): null => null;
export const writeFile = (): null => null;
export const existsSync = (): boolean => false;
export const exists = (): boolean => false;

export default {
  readFileSync,
  readFile,
  writeFileSync,
  writeFile,
  existsSync,
  exists,
};

