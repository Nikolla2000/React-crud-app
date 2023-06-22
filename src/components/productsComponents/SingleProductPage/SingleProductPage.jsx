import { createContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import ProductDeleteModal from "./ProductDeleteModal";
import { Link } from "react-router-dom";
import './ProductPage.css'

const SingleProductPage = () => {
  const [product, setProduct] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [shown, setShown] = useState(false)
  const [showImg, setShowImg] = useState(false)
  const params = useParams()
  const navigate = useNavigate()
  const id = params.productId

    useEffect(() => {
      fetch(`https://dummyjson.com/products/${params.productId}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data)
        })
        
      }, [params.productId])

      const showButtons = () => {
        setShown(true)
      }

      const hideButtons = () => {
        setShown(false)
      }

      const generateRatingStars = (rating) => {
        const totalStars = 5;
        const filledStars = Math.round(rating);
        const emptyStars = totalStars - filledStars;
        const starIcon = '★';
        const emptyStarIcon = '☆';
    
        return (
          <>
            {Array(filledStars).fill(starIcon)}
            {Array(emptyStars).fill(emptyStarIcon)}
          </>
        );
      };

      const useDiscountedPrice = (price, discountPercentage) => {
        const calculateDiscounteedPrice = () => {
            const discountAmount = (price * discountPercentage) / 100
            return price - discountAmount
        }
        return calculateDiscounteedPrice().toFixed(2)
    }

    return (
        <div>
            {!product ? (
                <h1>Loading...</h1> 
            ) : (
              <div className="product-page-wrapper">
                    <ProductContext.Provider value={{showDeleteModal, setShowDeleteModal, params, product
                    }}>
                    <h1>{product.brand} {product.title}</h1>
                    <p className="sub-title">{product.description}</p>
                    <div className="description">
                      <div className="img-wrapper">
                        <img className='main-img' 
                             src={product.thumbnail} 
                             alt={product.title}
                             onMouseEnter={() => showButtons()}
                             onMouseLeave={() => hideButtons()}/>
                        <div className="buttons-wrapper">
                          <Link to={`/products/edit/${id}`}><button className={shown ? 
                              'shown' 
                            : 'notshown'}>Edit</button></Link>
                          <button onClick={() => setShowDeleteModal(true)} className={shown ? 
                            'shown' 
                            : 'notshown'}>Delete</button>
                        </div>
                      </div>
                      <div className="product-data">
                        <p>Price: ${product.price}</p>
                        <p>Rating: {generateRatingStars(product.rating)}</p>
                        <p>Left in stock: {product.stock}</p>
                        <p>Category: {product.category}</p>
                        <p style={{'color': 'darkRed'}}>Price after discount: ${useDiscountedPrice(product.price, product.discountPercentage)}</p>
                      </div>
                    </div>
                    <p className="p-moreimg" onClick={() => setShowImg(prevState => !prevState)}>{showImg ? 
                    'Hide Images ↑' 
                    : 'See More Images...'}</p>
                    <div className={showImg ? 'other-images' : 'notshown'}>
                            <img src={product.images[0]}/>
                            <img src={product.images[1]}/>
                    </div>
                    {/* {Object.entries(product).map((entry) => {
                      const [key, value] = entry;
                      return <p>{key} : {value}</p>;
                    })} */}
                    {showDeleteModal && <ProductDeleteModal/>}
                    </ProductContext.Provider>
                </div>
            )}
        </div>
    );
}

export default SingleProductPage
export const ProductContext = createContext()