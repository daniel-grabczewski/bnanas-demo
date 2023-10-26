import { IndividualProduct, ShopProduct } from '../../models/product'
import { products } from '../data'

// Function to load all products
export function getAllProductsApi(): ShopProduct[] {
  return products.map(({ id, name, price, imgSrc }) => ({
    id,
    name,
    price,
    imgSrc,
  }))
}

// Function to get a product by ID
export function getProductByIdApi(productId: number): IndividualProduct | null {
  return products.find((product) => product.id === productId) || null
}
