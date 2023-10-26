import { CartItem } from '../../models/cart'
import { products } from '../data'

// Utility function to get and parse cart from local storage
function getCartFromLocalStorage(): CartItem[] {
  const cart = localStorage.getItem('cart')
  return cart ? JSON.parse(cart) : []
}

// Utility function to set cart in local storage
function setCartInLocalStorage(cart: CartItem[]) {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function getCartApi(): CartItem[] {
  return getCartFromLocalStorage()
}

export function updateCartItemQuantityByProductIdApi(
  productId: number,
  newQuantity: number
): void {
  const cart = getCartFromLocalStorage()
  const index = cart.findIndex((item) => item.productId === productId)

  if (index !== -1) {
    cart[index].quantity = newQuantity
  }

  setCartInLocalStorage(cart)
}

export function clearCartApi(): void {
  setCartInLocalStorage([])
}

export function removeCartItemApi(productId: number): void {
  const cart = getCartFromLocalStorage()
  const updatedCart = cart.filter((item) => item.productId !== productId)
  setCartInLocalStorage(updatedCart)
}

export function addToCartByIdApi(productId: number, quantity = 1): void {
  const cart = getCartFromLocalStorage();
  const index = cart.findIndex((item) => item.productId === productId);

  if (index !== -1) {
    // If the product is already in the cart, increase its quantity by the specified amount
    cart[index].quantity += quantity;
  } else {
    // If the product is not in the cart, add it with the specified quantity
    const product = products.find((item) => item.id === productId); // Assuming 'products' is your product data array
    if (product) {
      const newItem: CartItem = {
        id: productId,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        imgSrc: product.imgSrc,
        weight: product.weight,
      };
      cart.push(newItem);
    }
  }

  setCartInLocalStorage(cart);
}

