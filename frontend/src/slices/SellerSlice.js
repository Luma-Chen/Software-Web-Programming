import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { httpGet, httpPost, httpDelete, httpPut } from "../utils";
import { baseUrl } from "../baseUrl";

const sellersAdapter = createEntityAdapter();

const initialState = sellersAdapter.getInitialState({
  status: "not_loaded",
  error: null,
});

export const fetchSellers = createAsyncThunk(
  "database/fetchSellers",
  async (_, { getState }) => {
    return await httpGet(`${baseUrl}/sellers`, { userId: getState().users?.ids[0] }, { headers: { Authorization: 'Bearer' + getState().users.token } });
  }
);

export const deleteSellersServer = createAsyncThunk(
  "database/deleteSellersServer",
  async (idSeller, { getState }) => {
    await httpDelete(`${baseUrl}/sellers/${idSeller}`, { headers: { Authorization: 'Bearer ' + getState().users.token } });
    return idSeller;
  }
);

export const addSellersServer = createAsyncThunk(
  "database/addSellersServer",
  async (seller, { getState }) => {
    seller = { ...seller, userId: getState().users.ids[0] }
    return await httpPost(`${baseUrl}/sellers`, seller, { headers: { Authorization: 'Bearer ' + getState().users.token } });
  }
);

export const updateSellersServer = createAsyncThunk(
  "database/updateSellersServer",
  async (seller, { getState }) => {
    return await httpPut(`${baseUrl}/sellers/${seller.id}`, seller, { headers: { Authorization: 'Bearer ' + getState().users.token } });
  }
);

export const sellersSlice = createSlice({
  name: "sellers",
  initialState: initialState,
  extraReducers: {
    [fetchSellers.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchSellers.fulfilled]: (state, action) => {
      state.status = "loaded";
      if (action.payload) {
        sellersAdapter.setAll(state, action.payload);
      }
    },
    [fetchSellers.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [deleteSellersServer.pending]: (state, action) => {
      state.status = "loading";
    },
    [addSellersServer.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateSellersServer.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteSellersServer.fulfilled]: (state, { payload: id }) => {
      state.status = "deleted";
      sellersAdapter.removeOne(state, id);
    },
    [addSellersServer.fulfilled]: (state, action) => {
      state.status = "saved";
      sellersAdapter.addOne(state, action.payload);
    },
    [updateSellersServer.fulfilled]: (state, action) => {
      state.status = "saved";
      sellersAdapter.upsertOne(state, action.payload);
    },
  },
});

export default sellersSlice.reducer;

export const {
  selectAll: selectAllSellers,
  selectById: selectSellersById,

} = sellersAdapter.getSelectors((state) => state.sellers);
