/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useQuery } from 'react-query'
import {
  clearCartApi,
  removeCartItemApi,
  updateCartItemQuantityByProductIdApi,
  getCartApi,
} from '../../apis/cart'
import { CartItem } from '../../../models/cart'
import CartSummaryDetails from '../../components/CartSummaryDetails/CartSummaryDetails'
import { useNavigate } from 'react-router-dom'
import { trashCanFilePath } from '../../data'

function Cart() {
  const navigate = useNavigate()
  function goTo(link: string) {
    navigate(link)
  }

  const { data, refetch } = useQuery(['getCart'], async () => {
    const cart = getCartApi()
    return cart as CartItem[]
  })

  //FUNCTIONS TO HANDLE QUANTITY CHANGES
  async function handleIncrease(productId: number, quantity: number) {
    updateCartItemQuantityByProductIdApi(productId, quantity)
    refetch()
  }

  async function handleDecrease(productId: number, quantity: number) {
    if (quantity > 0) {
      updateCartItemQuantityByProductIdApi(productId, quantity)
      refetch()
    }
  }

  async function handleRemove(productId: number) {
    removeCartItemApi(productId)
    refetch()
  }

  async function handleRemoveAll() {
    clearCartApi()
    refetch()
  }

  return (
    <>
      {data && (
        <div className="cart">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <button
                  className="cart__continue-btn"
                  onClick={() => goTo('/shop')}
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-8">
                <div className="cart__items">
                  {data &&
                    data.map((item) => (
                      <div key={item.name} className="cart__item">
                        <div className="cart__img-container">
                          <img src={item.imgSrc} alt="" />
                        </div>
                        <div className="cart__item-name">
                          <h2>{item.name}</h2>
                          <p>{item.weight * item.quantity}g</p>
                        </div>
                        <div className="cart__item-price">
                          <p>$ {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <div className="cart__item-qty">
                          <div className="cart__item-qty-selector">
                            <button
                              className="cart__item-qty-btn"
                              onClick={() =>
                                handleDecrease(
                                  item.productId,
                                  item.quantity - 1
                                )
                              }
                            >
                              -
                            </button>
                            <p>{item.quantity}</p>
                            <button
                              className="cart__item-qty-btn"
                              onClick={() =>
                                handleIncrease(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                          <div className="cart__item-trash">
                            <img
                              style={{
                                cursor: 'pointer',
                              }}
                              src={trashCanFilePath}
                              alt=""
                              onClick={() => handleRemove(item.productId)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <button
                  className="cart__clear-btn"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleRemoveAll()}
                >
                  clear cart
                </button>
              </div>
              <div className="col-12 col-md-4">
                <CartSummaryDetails products={data} refetch={refetch} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Cart
