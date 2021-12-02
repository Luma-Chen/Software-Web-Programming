import { configureStore } from '@reduxjs/toolkit'
import  productsReducer from './slices/ProductsSlice'
import  bookingsReducer from './slices/BookingsSlice'
import sellersReducer from './slices/SellerSlice'
import usersReducer from './slices/UserSlice'

export const store = configureStore({
    reducer: {
        products: productsReducer, 
        bookings: bookingsReducer,
        sellers: sellersReducer,
        users: usersReducer,
     /*aqui poderiam entrar mais reducers, um por chave do mapa */
    }
})
