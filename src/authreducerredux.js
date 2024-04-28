import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
};
const expenseInitialState = {
  expenseItems: [],
};
const darkTheme = {
  darkMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: darkTheme,
  reducers: {
    toggleTheme(state) {
      state.darkMode = !state.darkMode;
    },
  },
})

const expenseSlice = createSlice({
  name: "expenses",
  initialState: expenseInitialState,
  reducers: {
    addExpense(state, action) {
        console.log(action.payload,'itemadded');
      state.expenseItems.push(action.payload);
    },
    deleteExpense(state, action) {
      state.expenseItems = state.expenseItems.filter(
        (item) => item.id !== action.payload
      );
    }
  },
});
const AuthSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    authentication: AuthSlice.reducer,
    expenses: expenseSlice.reducer,
  },
});

export const themeActions = themeSlice.actions;
export const expenseActions = expenseSlice.actions;
export const authActions = AuthSlice.actions;
export default store;
