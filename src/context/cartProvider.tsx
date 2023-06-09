import {createContext, useContext, ReactElement, useState, useEffect, useReducer, useMemo} from 'react'


export type CartItemType ={
    sku:string,
    name:string,
    price:number,
    qty:number,
}

type CartStateType = {cart:CartItemType[]};

const initialCartState:CartStateType={cart:[]}

const REDUCER_ACTION_TYPE = {
    ADD:'ADD',
    REMOVE:'REMOVE',
    QUANTITY:'QUANTITY',
    SUBMIT:'SUBMIT'
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction  = {
    type:string,
    payload?:CartItemType
}

const reducer = (state:CartStateType, action: ReducerAction): CartStateType => {
    switch(action.type){
        case REDUCER_ACTION_TYPE.ADD:{

          if(!action.payload) {
            throw new Error ('action.payload missing in add action')
          }

          const {sku, name, price} = action.payload

          //items not in the  cart
          const filteredCart:CartItemType[] = state.cart.filter((item) => item.sku !== sku)

          //get the cart item
          const ItemExist : CartItemType | undefined  = state.cart.find((item) => item.sku === sku)

          //changing the quantity of the item in the cart
          const qty:number = ItemExist? ItemExist.qty +1 :1

          return {...state, cart:[...filteredCart, {sku, name, price, qty}]}        
        
        }

        case REDUCER_ACTION_TYPE.REMOVE:{
            if(!action.payload) {
                throw new Error ('action.payload missing in add remove')
              }

              if(!action.payload) {
                throw new Error ('action.payload missing in add action')
              }
    
              const {sku} = action.payload
    
              //items not in the  cart
              const filteredCart:CartItemType[] = state.cart.filter((item) => item.sku !== sku)

    
              return {...state, cart:[...filteredCart]}   
        }


        case REDUCER_ACTION_TYPE.QUANTITY:{
            if(!action.payload) {
                throw new Error ('action.payload missing in quantity action')
              }
              const {sku, qty} = action.payload

              
              //get the cart item
              const ItemExist : CartItemType | undefined  = state.cart.find((item) => item.sku === sku)

              if(!ItemExist){
                throw new Error('Item must exist in order to update quantity')
              }
              
              const updatedItem :CartItemType = {...ItemExist, qty}
          

              //items not in the  cart
              const filteredCart:CartItemType[] = state.cart.filter((item) => item.sku !== sku)
    
              return {...state, cart:[...filteredCart, updatedItem]}     
        }

        case REDUCER_ACTION_TYPE.SUBMIT:{
            return {...state, cart:[]}
            
        }

        default:
            throw new Error('unidentified reducer action type')
    }
}

const useCartContext = (initialCartState: CartStateType) => {

    const [state, dispatch] =  useReducer(reducer, initialCartState)

const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE
}, [])

const totalItems = state.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.qty
},0)

const totalPrice =  new Intl.NumberFormat('en-US', {style:'currency', currency:'USD'}).format(
    state.cart.reduce((previousValue, cartItem) => {
        return previousValue + (cartItem.qty * cartItem.price)
    }, 0)
)


const cart =  state.cart.sort((a, b) => {
    const itemA =  Number(a.sku.slice(-4))
    const itemB =  Number(b.sku.slice(-4))

    return itemA - itemB
} )


return {dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart}
}

export type UseCartContextType = ReturnType<typeof useCartContext>

const initialCartContextState:UseCartContextType = {
    dispatch:() => {},
    REDUCER_ACTIONS:REDUCER_ACTION_TYPE,
    totalItems:0,
    totalPrice:'',
    cart:[]
}

export const CartContext = createContext<UseCartContextType>(initialCartContextState)

//children are optional
type ChildrenType  = {children?:ReactElement | ReactElement[]}

export const CartProvider = ({children}:ChildrenType):ReactElement => {

    return (
        <CartContext.Provider value={useCartContext(initialCartState)}>


            {children}
        </CartContext.Provider>
    )
    
}

export default CartContext