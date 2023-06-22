import AllProducts from '../components/productsComponents/AllProducts/AllProducts'
import CreateNewProductForm from '../components/productsComponents/CreateNewProductForm/CreateNewProductForm'
import EditProductPage from '../components/productsComponents/EditProductPage/EditProductPage'
import HomePage from '../components/productsComponents/HomePage/HomePage'
import SingleProductPage from '../components/productsComponents/SingleProductPage/SingleProductPage'

const routes = {
    homePage: {path: '/', name: 'Home Page', includeInNavigation: true, element: <HomePage/>},
    allProducts: {path: '/products', name: 'Products', includeInNavigation: true, element: <AllProducts/> },
    productById: {path: '/products/:productId', name: '', includeInNavigation: false, element: <SingleProductPage/>},
    createNewProduct: {path: '/products/create', name: 'Add New Product', includeInNavigation: true, element: <CreateNewProductForm/>},
    editProductById: {path: '/products/edit/:productId', name: '', includeInNavigation: false, element: <EditProductPage/>}
}

export default routes   