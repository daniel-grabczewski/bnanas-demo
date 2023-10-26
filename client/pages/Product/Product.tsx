import { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getProductByIdApi } from '../../apis/products'
import { ChangeEvent } from 'react'
import FeaturedBanana from '../../components/FeaturedBanana/FeaturedBanana'
import { addToCartByIdApi } from '../../apis/cart'
import { IndividualProduct } from '../../../models/product'

function Product() {
  const params = useParams()
  const id = Number(params.id)
  const [selectedQuantity, setSelectedQuantity] = useState<string>('1')
  const [buttonText, setButtonText] = useState('Add to Cart')

  const { data: product } = useQuery(['getProduct', id], async () => {
    const product = getProductByIdApi(id)
    return product as IndividualProduct
  })

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedQuantity(event.target.value)
  }

  async function handleClick(productId: number, quantity: number) {
    addToCartByIdApi(productId, quantity)
    setSelectedQuantity('1')
    setButtonText('Added to Cart')
    setTimeout(() => {
      setButtonText('Add to Cart')
    }, 2000)
  }

  return (
    <>
      {product && (
        <>
          <div className="shop-single">
            <div className="shop-single-product">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <img src={product.imgSrc} alt="" />
                  </div>
                  <div className="col-12 col-sm-6 col-vertical-center">
                    <div>
                      <h1>{product.name}</h1>
                      <p className="shop-single-product__weight">
                        {product.weight}g
                      </p>
                      <p className="shop-single-product__price">
                        ${product.price}
                      </p>
                      <select
                        value={selectedQuantity}
                        onChange={handleSelectChange}
                        className="shop-single-product__select"
                      >
                        <option>1</option>
                        {[2, 3, 4, 5].map((number) => (
                          <option key={number} value={number.toString()}>
                            {number}
                          </option>
                        ))}
                      </select>
                      <p className="shop-single-product__description">
                        {product.description}
                      </p>
                      <button
                        onClick={() =>
                          handleClick(product.id, Number(selectedQuantity))
                        }
                      >
                        {buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="shop-faq">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="shop-faq__container">
                    <h2>FAQ</h2>
                    <p>
                      <strong>Random fact, </strong>
                      {product.randomFact}
                    </p>
                    <p>
                      <strong>Origin, </strong>
                      {product.origin}
                    </p>
                    <p>
                      <strong>Calories, </strong>
                      {product.calorieCount}
                    </p>
                    <p>
                      <strong>Taste, </strong>
                      {product.tasteProfile}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <FeaturedBanana />
          </div>
        </>
      )}
    </>
  )
}

export default Product
