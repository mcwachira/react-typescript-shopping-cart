import { useContext } from "react";
import ProductContext from "../context/productProvider";
import { UseProductsContextType } from '../context/productProvider';

const useProduct = ():UseProductsContextType => {
    return useContext(ProductContext)
}

export default useProduct;