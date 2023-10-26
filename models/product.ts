export interface IndividualProduct {
  id: number
  name: string
  price: number
  imgSrc: string
  description: string
  calorieCount: number
  weight: number
  tasteProfile: string
  origin: string
  randomFact: string
}

export interface ShopProduct {
  id: number
  name: string
  price: number
  imgSrc: string
}