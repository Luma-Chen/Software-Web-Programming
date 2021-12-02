import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { baseUrl } from "../baseUrl";
import { httpDelete, httpGet, httpPost, httpPut } from "../utils";

const bookingsAdapter = createEntityAdapter();
const initialBookings = bookingsAdapter.getInitialState({
  status: "not_loaded",
  error: null,
});
//TODO get only the reserves of a particular user
//TODO get also the reserves of his products
export const fetchBookings = createAsyncThunk(
  "database/fetchBookings",
  async (_, { getState }) => {
    const obj = { userId: getState().users?.ids[0] }
    return await httpGet(`${baseUrl}/bookings`, { headers: { Authorization: 'Bearer ' + getState().users?.token } });
  }
);
export const addBookingServer = createAsyncThunk(
  "database/addBookingServer",
  async (booking, { getState }) => {
    console.log({ ...booking, idBuyer: (getState().users.ids[0]) })
    console.log(getState()?.users?.ids[0])
    return await httpPost(`${baseUrl}/bookings`, { ...booking, idBuyer: (getState().users?.ids[0]) }, { headers: { Authorization: 'Bearer ' + getState().users?.token } });
  }
);
export const deleteBookingServer = createAsyncThunk(
  "database/deleteBooking",
  async (id, { getState }) => {
    await httpDelete(`${baseUrl}/bookings/${id}`, { headers: { Authorization: 'Bearer ' + getState().users?.token } });
    return id;
  }
);
export const updateBookingServer = createAsyncThunk(
  "database/updateBookingServer",
  async (booking, { getState }) => {
    console.log(getState().users.token)
    return await httpPut(`${baseUrl}/bookings/${booking.id}`, booking, { headers: { Authorization: 'Bearer ' + getState().users?.token } });
  }
);
export const bookingsSlice = createSlice({
  name: "bookings",
  initialState: initialBookings,
  extraReducers: {
    [fetchBookings.fulfilled]: (state, { payload }) => {
      bookingsAdapter.setAll(state, payload);
      state.status = "loaded";
    },
    [fetchBookings.pending]: (state) => {
      state.status = "loading";
    },
    [fetchBookings.rejected]: (state, { error }) => {
      state.status = "failed";
      state.error = error.message;
    },
    [addBookingServer.fulfilled]: (state, { payload: booking }) => {
      state.status = "saved";
      bookingsAdapter.addOne(state, booking);
    },
    [deleteBookingServer.fulfilled]: (state, { payload: id }) => {
      state.status = "deleted";
      bookingsAdapter.removeOne(state, id);
    },
    [updateBookingServer.fulfilled]: (state, { payload: booking }) => {
      state.status = "updated";
      bookingsAdapter.upsertOne(state, booking);
    },
    [deleteBookingServer.pending]: (state) => {
      state.status = "loading";
    },
    [addBookingServer.pending]: (state) => {
      state.status = "loading";
    },
    [addBookingServer.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [updateBookingServer.pending]: (state) => {
      state.status = "loading2";
    },
  },
});
const bookingsSelector = bookingsAdapter.getSelectors(
  (state) => state.bookings
);
export const {
  selectAll: selectALLBookings,
  selectById: selectBookingById,
  selectEntities: selectBookingEntities,
  selectTotal: selectBookingsTotal,
} = bookingsSelector;
export default bookingsSlice.reducer;
