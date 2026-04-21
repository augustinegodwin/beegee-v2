import Cookies from 'js-cookie';

// Helper to handle cookie operations with default security settings
export const cookieManager = {
  set: (name: string, value: any, expires = 7) => {
    Cookies.set(name, JSON.stringify(value), {
      expires,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });
  },
  get: (name: string) => {
    const value = Cookies.get(name);
    try {
      return value ? JSON.parse(value) : null;
    } catch {
      return value; // Fallback if not JSON
    }
  },
  remove: (name: string) => {
    Cookies.remove(name, { path: '/' });
  },
};