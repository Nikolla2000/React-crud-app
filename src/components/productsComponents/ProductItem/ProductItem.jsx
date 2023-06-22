import { Link } from "react-router-dom"
import styles from './Productitem.module.css'

const ProductItem = ({product}) => {

    const useDiscountedPrice = (price, discountPercentage) => {
        const calculateDiscounteedPrice = () => {
            const discountAmount = (price * discountPercentage) / 100
            return price - discountAmount
        }
        return calculateDiscounteedPrice().toFixed(2)
    }


    const discountHook = useDiscountedPrice(product.price, product.discountPercentage)
    return (
        <div className={styles.itemWrapper}>
            <Link to={`/products/${product.id}`} 
            className={styles.link}
            discountHook={useDiscountedPrice}
            product={product}>
                <h3 className={styles.title}>{product.title}</h3>
                <img className={styles.img} src={product.thumbnail} alt={product.title}/>
            <p className={styles.p}>Brand: {product.brand}</p>
            <p className={styles.p}>Price: ${product.price}</p>
            <p className={styles.p}>Left in stock: {product.stock}</p>
            <p className={styles.p}>Discount: {product.discountPercentage}%</p>
            <p className={styles.p}>Price after discount: ${useDiscountedPrice(product.price, product.discountPercentage)}</p>
            </Link>

        </div>
    )
}


// Stuff to list: title, price, brand, thumbnail, stock, discounPercentage
export default ProductItem