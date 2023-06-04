import { ProductType } from '../context/productProvider';
import { ReducerActionType, ReducerAction } from '../context/cartProvider';
import { ReactElement } from 'react';

type propsType ={
  product:ProductType,
  dispatch:React.Dispatch<ReducerAction>,
  REDUCER_ACTIONS:ReducerActionType,
  inCart:boolean

}


const Product = ({product, dispatch, REDUCER_ACTIONS, inCart}:propsType):ReactElement => {

    const img:string  = new URL(`../images/${product.sku}.jpg`, import.meta.url).href

    console.log(img)

    const onAddToCart = () => dispatch({type:REDUCER_ACTIONS.ADD, payload:{...product, qty:1}})

    const itemInCart = inCart ? 'Item In Cart':null
    const content = (
        <article className="product">
            <h3>{product.name}</h3>
            <img src={img} alt={product.name} className="product__img" />
            <p>{ new Intl.NumberFormat('en-US', {style:'currency', currency:'USD'}).format(product.price)} {itemInCart}</p>
       
       <button onClick={onAddToCart}> Add to Cart </button>
        </article>
    )
  return content
}

export default Product