import { IndividualProduct } from '../../models/product'
import { products } from '../data'

// Function to load all products
export function getAllProductsApi(): IndividualProduct[] {
  return products
}

// Function to get a product by ID
export function getProductByIdApi(productId: number): IndividualProduct | null {
  return products.find((product) => product.id === productId) || null
}
