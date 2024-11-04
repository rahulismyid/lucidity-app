import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsService } from "../services";

const initialState = {
  error: null,
  products: [],
  userType: "admin",
  statsTiles: [],
  editProduct: {
    name: "",
    category: "",
    value: "",
    quantity: "",
    price: "",
  },
};

const calculateInventoryData = (products) => {
  if (!products || !products?.length) return [];
  const filteredProducts = products?.filter((product) => !product?.disable);
  const totalProducts = filteredProducts?.length;
  const totalAmount = filteredProducts?.reduce((total, product) => {
    const value = parseFloat(product.value.replace("$", "")) || 0;
    return total + value;
  }, 0);

  const outOfStock = filteredProducts?.filter(
    (product) => product.quantity === 0
  );
  const totalCategory = new Set(
    filteredProducts?.map((product) => product.category)
  ).size;

  return [
    {
      label: "Total Product",
      value: totalProducts,
      iconKey: "totalProducts",
    },
    {
      label: "Total store value",
      value: totalAmount,
      iconKey: "totalAmount",
    },
    {
      label: "Out of Stocks",
      value: outOfStock?.length || 0,
      iconKey: "outOfStock",
    },
    {
      label: "No. of Category",
      value: totalCategory,
      iconKey: "categories",
    },
  ];
};

export const fetchProducts = createAsyncThunk(
  "inventory/fetchProducts",
  async () => {
    const data = await fetchProductsService();
    return data;
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    getInventoryData: (state) => {
      state.statsTiles = calculateInventoryData(state.products);
    },

    updateProduct: (state, action) => {
      const { name, value, quantity, price } = action.payload;
      const product = state.products.find((product) => product.name === name);
      if (product) {
        Object.assign(product, { value, quantity, price });
        state.statsTiles = calculateInventoryData(state.products);
      }
    },

    disableProduct: (state, action) => {
      const { name, disable } = action.payload;
      const product = state.products.find((product) => product.name === name);
      if (product) {
        Object.assign(product, { disable });
        state.statsTiles = calculateInventoryData(state.products);
      }
    },

    deleteProduct: (state, action) => {
      const { name } = action.payload;
      state.products = state.products?.filter(
        (product) => product.name !== name
      );
      state.statsTiles = calculateInventoryData(state.products);
    },

    toggleUser: (state, action) => {
      state.userType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.products = [];
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.statsTiles = calculateInventoryData(action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const {
  getInventoryData,
  disableProduct,
  deleteProduct,
  toggleUser,
  updateProduct,
} = inventorySlice.actions;

export default inventorySlice.reducer;
