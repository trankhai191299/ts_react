import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import Product from '../../components/Product/Product';
import {AppDispatch, RootState} from "../../redux/configStore"
import { getProductApi, ProductModel } from '../../redux/reducers/productReducer';
type Props = {
    title?:string
}

export default function Home({title}: Props) {
  const{arrProduct}= useSelector((state:RootState)=>state.productReducer)
  const dispatch:AppDispatch = useDispatch()
  useEffect(()=>{
    // call action
    const actionApi = getProductApi()
    dispatch(actionApi) 
  },[])
  const renderResult = () =>{
    return arrProduct.map((prod:ProductModel,index:number)=>{
      return <div className='col-4 mt-2' key={index}>
        <Product product={prod}></Product>
      </div>
    })
  }
  return (
    <div className='container'>
      <h1 className='text-center'>Shoes Shop</h1>
      <div className="row">
        {renderResult()}
      </div>
    </div>
  )
}