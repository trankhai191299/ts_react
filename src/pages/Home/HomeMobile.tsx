import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../../components/Product/Product'
import { AppDispatch, RootState } from '../../redux/configStore'
import { getProductApi, ProductModel } from '../../redux/reducers/productReducer'

type Props = {}

export default function HomeMobile({}: Props) {
    const{arrProduct}= useSelector((state:RootState)=>state.productReducer)
    const dispatch:AppDispatch = useDispatch()
    useEffect(()=>{
      // call action
      const actionApi = getProductApi()
      dispatch(actionApi) 
    },[])
    const renderProduct = () =>{
      return arrProduct.map((prod:ProductModel,index:number)=>{
        return <div className='d-flex' key={index}>
          <div className="image w-25">
            <img src={prod.image} alt={prod.name} className='w-100'/>
          </div>
          <div className="content w-75">
            <p>{prod.description}</p>
            <button className='btn btn-dark text-white'>View Detail</button>
          </div>
        </div>
      })
    }
    return (
      <div className='container'>
        <h1 className='text-center'>Shoes Shop</h1>
        <div className="row">
          {renderProduct()}
        </div>
      </div>
    )
}