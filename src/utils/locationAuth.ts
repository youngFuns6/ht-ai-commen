import { Auth } from "@/types/Auth"

export const setLocationAuth = (auth: Auth): void => {
  localStorage.setItem('adminInfo', JSON.stringify(auth));
}

export const getLocationAuth = (): Auth | null => {
  if(localStorage.getItem('adminInfo')){
    return JSON.parse(localStorage.getItem('adminInfo') as string);
  }
  return null;
}

export const removeLocationAuth = (): void => {
  localStorage.removeItem('adminInfo');
}
