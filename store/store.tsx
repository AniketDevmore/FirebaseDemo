import {configureStore} from '@reduxjs/toolkit';
import products from './products';

export const store = configureStore({
    reducer : {
        cartProducts: products
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch