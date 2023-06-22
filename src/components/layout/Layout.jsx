import { Route, Routes } from "react-router"
import routes from "../../utils/constants"
import AllProducts from "../productsComponents/AllProducts/AllProducts"

const Layout = () => {
    return (
      <Routes>
        {Object.values(routes).map((route) => (
          <Route element={route.element} path={route.path} key={route.path} />
        ))}
      </Routes>
    )
  }

export default Layout