import React from 'react'
import { ProductModel } from '../../redux/reducers/productReducer'

type Props = {
    product:ProductModel
}

export default function Product({product}: Props) {
  return (
    <div className='card'>
        <img src={product.image} alt={product.name} className="w-100"/>
        <div className="d-flex justify-content-between">
            <div className='bg-warning'>{product.name}</div>
            <div>{product.price}</div>
        </div>
    </div>
  )
}