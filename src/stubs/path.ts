// Browser stub for Node.js 'path' module
// This prevents runtime errors when libraries check for path

export const join = (...args: string[]): string => args.join('/');
export const resolve = (...args: string[]): string => args.join('/');
export const dirname = (p: string): string => p.split('/').slice(0, -1).join('/');
export const basename = (p: string): string => p.split('/').pop() || '';
export const extname = (p: string): string => {
  const base = basename(p);
  const idx = base.lastIndexOf('.');
  return idx > 0 ? base.slice(idx) : '';
};

export default {
  join,
  resolve,
  dirname,
  basename,
  extname,
};

