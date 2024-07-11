import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type PropertyFilter = {
  state?: string;
  city?: string;
  property_type?: string;
  bedrooms?: number;
  area_sqft?: number;
  built_year_from?: number;
  built_year_to?: number;
  from_price?: number;
  to_price?: number;
  page?: number;
  property_for?: string;
  bathrooms?: number;
  amenities?: string;
  bt_from?: number;
  bt_to?: number;
  bd_from?: number;
  bd_to?: number;
  min_sqft?: number;
  max_sqft?: number;
};

export type PropertyFilterState = {
  filter: PropertyFilter;
};

const initialState: PropertyFilterState = {
  filter: {
    min_sqft: 0,
    bt_from: 0, 
    bd_from: 0,
    built_year_from: 0
  },
};

const propertFilterSlice = createSlice({
  name: 'propertyFilter',
  initialState,
  reducers: {
    setPropertyFilter: (state, action: PayloadAction<PropertyFilter>) => {
      state.filter = action.payload;
    },
    upsertPropertFilter: (state, action: PayloadAction<PropertyFilter>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
});

export const { setPropertyFilter, upsertPropertFilter } =
  propertFilterSlice.actions;
const propertyReducer = propertFilterSlice.reducer;
export default propertyReducer;
