import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  cart: any[]
}

const initialState: CounterState = {
  cart: [],
}

export const products = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<any>) => {
      let index = state.cart.findIndex((ele: any) => ele.id === action.payload.id)

      if (index >= 0) {
        state.cart[index].qty += action.payload.qty
      } else {
        state.cart.push(action.payload);
      }
    },
    removeCart: (state, action: PayloadAction<any>) => {
      const index = state.cart.findIndex((ele: any) => ele.id === action.payload.id)
      // console.log(index)
      state.cart.splice(index, 1)
    },
    reduceQtyInCart: (state, action: PayloadAction<any>)=>{
      let index = state.cart.findIndex((ele: any) => ele.id === action.payload.id);

      if(state.cart[index].qty > 1){
        state.cart[index].qty -= 1
      }else{
        state.cart.splice(index, 1)
      }
    },
    addQtyInCart: (state, action:PayloadAction<any>) =>{
      let index = state.cart.findIndex((ele: any) => ele.id === action.payload.id);
      state.cart[index].qty += 1
    }

  }
})

export const { addCart, removeCart, reduceQtyInCart, addQtyInCart }: any = products.actions;

export default products.reducer;