import { useDispatch, useSelector } from 'react-redux'
import { addItem, selectCartItems } from './CartSlice.jsx'
import { plantCategories } from './data/plants.js'
import { formatPrice } from './utils/currency.js'
import './ProductList.css'

/**
 * Product listing page. Renders every plant grouped by category with an
 * "Add to Cart" button that is disabled once the plant is in the cart.
 */
function ProductList() {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const cartIds = new Set(cartItems.map((item) => item.id))

  const handleAddToCart = (plant) => {
    dispatch(
      addItem({
        id: plant.id,
        name: plant.name,
        image: plant.image,
        cost: plant.cost,
      }),
    )
  }

  return (
    <div className="product-list">
      {plantCategories.map((category) => (
        <section
          key={category.id}
          className="product-category"
          aria-labelledby={`category-${category.id}`}
        >
          <h2 id={`category-${category.id}`} className="product-category__title">
            {category.name}
          </h2>

          <div className="product-grid">
            {category.plants.map((plant) => {
              const inCart = cartIds.has(plant.id)
              return (
                <article
                  key={plant.id}
                  className="product-card"
                  data-testid={`product-${plant.id}`}
                >
                  <img
                    className="product-card__image"
                    src={plant.image}
                    alt={plant.name}
                    loading="lazy"
                  />
                  <h3 className="product-card__name">{plant.name}</h3>
                  <p className="product-card__description">{plant.description}</p>
                  <p className="product-card__price">{formatPrice(plant.cost)}</p>
                  <button
                    type="button"
                    className={`product-card__button${inCart ? ' product-card__button--added' : ''}`}
                    disabled={inCart}
                    onClick={() => handleAddToCart(plant)}
                  >
                    {inCart ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </article>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}

export default ProductList
