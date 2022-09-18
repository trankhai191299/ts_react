import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { http } from "../../utils/setting";
import { AppDispatch } from "../configStore";

export interface ProductModel {
  id: number;
  name: string;
  alias: string;
  price: number;
  description: string;
  size: string;
  shortDescription: string;
  quantity: number;
  deleted: boolean;
  categories: string;
  relatedProducts: string;
  feature: boolean;
  image: string;
}

const initialState:any = {
  arrProduct: [],
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getAllProductAction : (state,action:PayloadAction<ProductModel[]>)=>{
        state.arrProduct = action.payload
    }
  },
});

export const {getAllProductAction} = productReducer.actions;

export default productReducer.reducer;

//=---------------------------action api---------------
export const getProductApi = () =>{
    return async (dispatch:AppDispatch)=>{
        try {
            const result = await http.get('/product')
            // Sau khi lay ket qua ve dua len redux
            let arrProduct:ProductModel[] = result.data.content
            // Const action
            const action = getAllProductAction(arrProduct)
            dispatch(action)
        } catch (error) {
            console.log(error);
            
        }
    }
}