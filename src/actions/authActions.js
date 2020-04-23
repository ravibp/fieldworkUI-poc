export const setAdminFlag = (isAdmin) => ({
  type: "SET_ADMIN_FLAG",
  isAdmin,
});

export const setCustomerFlag = (isCustomer) => ({
  type: "SET_CUSTOMER_FLAG",
  isCustomer,
});

export const setConnectionObject = (connection) => ({
  type: "SET_CONNECTION_OBJECT",
  connection,
});
export const setUser = (user) => ({
  type: "SET_USER",
  user,
});
