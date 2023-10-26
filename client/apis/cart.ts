import { CartItem } from "../../models/cart";

// Utility function to get and parse cart from local storage
function getCartFromLocalStorage(): CartItem[] {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

// Utility function to set cart in local storage
function setCartInLocalStorage(cart: CartItem[]) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function getCartApi(): CartItem[] {
  return getCartFromLocalStorage();
}

export function updateCartItemQuantityByProductIdApi(updatedItem: CartItem): void {
  const cart = getCartFromLocalStorage();
  const index = cart.findIndex(item => item.productId === updatedItem.productId);

  if (index !== -1) {
    cart[index].quantity = updatedItem.quantity;
  }
  
  setCartInLocalStorage(cart);
}

export function clearCartApi(): void {
  localStorage.removeItem('cart');
}

export function removeCartItemApi(removedItem: CartItem): void {
  const cart = getCartFromLocalStorage();
  const updatedCart = cart.filter(item => item.productId !== removedItem.productId);
  
  setCartInLocalStorage(updatedCart);
}

export function addToCartByIdApi(newItem: CartItem): void {
  const cart = getCartFromLocalStorage();
  const index = cart.findIndex(item => item.productId === newItem.productId);

  if (index !== -1) {
    cart[index].quantity += newItem.quantity;
  } else {
    cart.push(newItem);
  }
  
  setCartInLocalStorage(cart);
}
