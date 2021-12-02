import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { httpGet, httpPost, httpDelete, httpPut } from "../utils";
import { baseUrl } from "../baseUrl";

const productsAdapter = createEntityAdapter();

const initialState = productsAdapter.getInitialState({
  status: "not_loaded",
  error: null,
});

export const fetchProducts = createAsyncThunk(
  "database/fetchProducts",
  async () => {
    console.log("database/fetchProducts");
    const result = await httpGet(`${baseUrl}/products`);
    return result;
  }
);

export const fetchMyproducts = createAsyncThunk("database/fetchMyProducts", async (_, { getState }) => {
  return await httpGet(`${baseUrl}/products/user`, { headers: { Authorization: 'Bearer ' + getState().users.token } })
})
export const deleteProductsServer = createAsyncThunk(
  "database/deleteProductsServer",
  async (idProduct, { getState }) => {
    await httpDelete(`${baseUrl}/products/${idProduct}`, { userId: getState().users?.ids[0] }, { headers: { Authorization: 'Bearer ' + getState().users.token } });
    return idProduct;
  }
);

export const addProductsServer = createAsyncThunk(
  "database/addProductsServer",
  async (product, { getState }) => {
    return await httpPost(`${baseUrl}/products`, { product: product, userId: getState().users?.ids[0] }, { headers: { Authorization: 'Bearer ' + getState().users.token } });
  }
);

export const updateProductsServer = createAsyncThunk(
  "database/updateProductsServer",
  async (product, { getState }) => {
    console.log(getState().users.token)
    return await httpPut(`${baseUrl}/products/${product.id}`, { product: product, userId: getState().users?.ids[0] }, { headers: { Authorization: 'Bearer ' + getState().users.token } });
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.status = "loaded";
      productsAdapter.setAll(state, action.payload);
    },
    [fetchProducts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchMyproducts.fulfilled]: (state, { payload }) => {
      state.status = "saved2";
      productsAdapter.setAll(payload);
    },
    [fetchMyproducts.rejected]: (state, { error }) => {
      state.error = error.message;
      state.status = "failed";
    },
    [fetchMyproducts.pending]: (state) => {
      state.status = "loading";
    },
    [deleteProductsServer.pending]: (state) => {
      state.status = "loading";
    },
    [addProductsServer.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateProductsServer.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteProductsServer.fulfilled]: (state, { payload: id }) => {
      state.status = "deleted";
      productsAdapter.removeOne(state, id);
    },
    [addProductsServer.fulfilled]: (state, action) => {
      state.status = "saved";
      productsAdapter.addOne(state, action.payload);
    },
    [updateProductsServer.fulfilled]: (state, action) => {
      state.status = "saved";
      productsAdapter.upsertOne(state, action.payload);
    },
  },
});

export default productsSlice.reducer;

export const {
  selectAll: selectAllProducts,
  selectById: selectProductsById,
} = productsAdapter.getSelectors((state) => state.products);
