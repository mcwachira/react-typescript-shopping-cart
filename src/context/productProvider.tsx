import {createContext, useContext, ReactElement, useState, useEffect} from 'react'

export type ProductType ={
    sku:string,
    name:string,
    price:number,
}


// export const initialState:ProductType[] = [
//     {
//         "sku": "item0001",
//         "name": "Widget",
//         "price": 9.99
//     },
//     {
//         "sku": "item0002",
//         "name": "Premium Widget",
//         "price": 19.99
//     },
//     {
//         "sku": "item0003",
//         "name": "Deluxe Widget",
//         "price": 29.99
//     }

// ]

export const initialState:ProductType[] = [];

export type UseProductsContextType = {products: ProductType[]}

const initialContextState :UseProductsContextType = {products :[]}


const ProductsContext  =createContext<UseProductsContextType>(initialContextState)


//children are optional
type ChildrenType  = {children?:ReactElement | ReactElement[]}

export const ProductProvider = ({children}:ChildrenType):ReactElement => {

    const [products,setProducts] = useState<ProductType[]>(initialState)

    useEffect(() => {
        const fetchProducts =  async():Promise<ProductType[]> => {
            const data =  await fetch('http://localhost:3500/products').then((res) => {
                // console.log(res)
                return res.json()
            })
            // console.log(data)

            return data
                }

                fetchProducts().then(products => setProducts(products))
    } , [])

    return (
        <ProductsContext.Provider value={{products}}>


            {children}
        </ProductsContext.Provider>
    )
    
}

export default ProductsContext