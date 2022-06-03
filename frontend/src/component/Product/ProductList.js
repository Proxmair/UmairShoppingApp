import React ,{memo}from 'react'
import ProductCard from './ProductCard.js'
const ProductList = ({products,heading}) => {
    return (
        <div className='home-product-container'>
            <h3 className='home-product-heading'>{heading}</h3>
            <div className='home-product'>
            {products &&products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
            </div>
        </div>
    )
}

export default memo(ProductList)