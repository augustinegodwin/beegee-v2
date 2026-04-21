import { create } from 'zustand'
import { getAuthenticatedUser } from '../lib/async_data';

import Cookies from 'js-cookie';   
import { cookieManager } from '../components/utils/cookiesUtils';
type AuthUser = {
  user:User,
  ordercont:number
}
type AuthState = {
    isAuthenticated: boolean;
    user: AuthUser | null;
    isLoading: boolean;
    networkError:boolean;
    setNetworkError:(value:boolean) => void;
    setIsAuthenticated: (value: boolean) => void;
    setUser: (user: AuthUser | null) => void;
    setLoading: (loading: boolean) => void;
    // Global Cookie Functions
    saveCookie: (name: string, value: any, days?: number) => void;
    getCookie: (name: string) => any;
    deleteCookie: (name: string) => void;
    fetchAuthenticatedUser: () => Promise<void>;
}
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated:false,
  user:null,
  isLoading:true,
  networkError:false,
  setNetworkError:(value)=>set({networkError:value}),
  setIsAuthenticated:(value)=>set({isAuthenticated:value}),
  setUser:(value)=>set({user:value}),
  setLoading:(value)=>set({isLoading:value}),
  // Logic for the Global Cookie Functions
  saveCookie: (name, value, days = 7) => {
    const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
    Cookies.set(name, stringValue, { expires: days, secure: true, sameSite: 'strict' });
  },

  getCookie: (name) => {
    const value = Cookies.get(name);
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  },

  deleteCookie: (name) => {
    Cookies.remove(name);
  },
  fetchAuthenticatedUser:async ()=> {
    set({isLoading:true})
    
    try {
      
        const user=await getAuthenticatedUser()
        if (user) set({isAuthenticated:true,user: (user as unknown) as AuthUser})
        else set({isAuthenticated:false,user:null})
    } catch (error) {
        set({isAuthenticated:false,user:null})
    }finally{
        set({isLoading:false})
    }
  }
}))