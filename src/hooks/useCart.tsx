import { useContext } from "react";
import CartContext from "../context/cartProvider";
import { UseCartContextType } from '../context/cartProvider';

const useCart = ():UseCartContextType => {
    return useContext(CartContext)
}

export default useCart;