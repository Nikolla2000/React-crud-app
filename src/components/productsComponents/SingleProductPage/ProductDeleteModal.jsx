import { useContext } from "react"
import { ProductContext } from "./SingleProductPage";
import { ProductsContext } from "../AllProducts/AllProducts";
import { useNavigate } from "react-router";
import './DeleteModal.css'

const ProductDeleteModal = () => {
    const {showDeleteModal, setShowDeleteModal, params, product} = useContext(ProductContext);
    const {setProducts} = useContext(ProductsContext)
    const navigate = useNavigate()

    const removeProductFromList = () => {
      setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== params.productId))
    }

    const deleteProduct = () => {
        fetch(`https://dummyjson.com/products/${params.productId}`, {
          method: 'DELETE'
        })
          .then((res) => {
            if (res.ok) {
              alert(`The product '${product.title}' was deleted!`);
              navigate('/products')
              removeProductFromList()
              
            } else {
              throw new Error('Failed to delete product');
            }
          })
          .catch((error) => {
            console.error(error);
          });
        setShowDeleteModal(true)
      };


    return (
        <div className="delete-modal">
          <img src='https://media.tenor.com/jXiv2wcDihcAAAAC/sure-john-cena.gif' alt="funny gif"/>
          <div className="buttons">
            <button onClick={deleteProduct}>Yes, I want to delete the product</button>
            <button onClick={() => setShowDeleteModal(false)}>No</button>
          </div>
          <span className="close-btn" onClick={() => setShowDeleteModal(false)}>X</span>
        </div>
    )
}

export default ProductDeleteModal