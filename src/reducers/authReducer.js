const initialState = {
  isAdmin: false,
  isCustomer: false,
  connection: null,
  user: null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ADMIN_FLAG":
      return { ...state, isAdmin: action.isAdmin };
    case "SET_CUSTOMER_FLAG":
      return { ...state, isCustomer: action.isCustomer };
    case "SET_CONNECTION_OBJECT":
      return { ...state, connection: action.connection };
    case "SET_USER":
      return { ...state, user: action.user };
    default:
      return state;
  }
};
export default authReducer;
