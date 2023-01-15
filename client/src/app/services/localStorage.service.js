const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";
const CART = "cart";

export function addCartLocalStorage(item) {
  const cart = getCartLocalStorage();
  cart.push({ ...item, num: 1 });
  localStorage.setItem(CART, JSON.stringify(cart));
}
export function deleteIdCartLocalStorage(id) {
  const cart = getCartLocalStorage();
  const tmp = cart.filter((item) => item._id !== id);
  localStorage.setItem(CART, JSON.stringify(tmp));
}

export function getCartLocalStorage() {
  return JSON.parse(localStorage.getItem(CART)) || [];
}
export const cartLocalStorage = JSON.parse(localStorage.getItem(CART)) || [];
export function setTokens({
  refreshToken,
  accessToken,
  userId,
  expiresIn = 3600
}) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(USERID_KEY, userId);
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate);
}
export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}
export function removeAuthData() {
  localStorage.removeItem(USERID_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
  localStorage.removeItem(CART);
}
export function removeCart() {
  localStorage.removeItem(CART);
}
export function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY);
}
export function getUserId() {
  return localStorage.getItem(USERID_KEY);
}
const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUserId,
  removeAuthData,
  addCartLocalStorage,
  getCartLocalStorage,
  deleteIdCartLocalStorage,
  removeCart,
  cartLocalStorage
};
export default localStorageService;
