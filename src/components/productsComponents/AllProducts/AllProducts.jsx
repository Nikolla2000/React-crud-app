import { createContext, useEffect, useState } from "react"
import ProductItem from "../ProductItem/ProductItem"
import styles from './AllProducts.module.css'


const ProductsContext = createContext({
  products: [],
  setProducts: () => {}
});

const AllProducts = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('https://dummyjson.com/products')
          .then((res) => res.json())
          .then((data) => {
            setProducts(data.products);
            setIsLoading(false);
          });
        }, []);


        return (
          <>
      {isLoading ? (
        <p className={styles.loading}>Loading...</p>
        ) : (
        <ProductsContext.Provider value={{ products, setProducts }}>
          <div className={styles.wrapper}>
            <h1 className={styles.heading}>Products</h1>
              <div className={styles.listWrapper}>
                {products.map((product) => (
                  <ProductItem key={product.id} product={product}/>
                ))}
              </div>
          </div>
        </ProductsContext.Provider>
      )}
    </>
    )
}

export default AllProducts
export {ProductsContext}